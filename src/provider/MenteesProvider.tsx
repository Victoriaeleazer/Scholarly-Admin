
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { Mentee } from "../interfaces/Mentee";
import { useStompClient } from "./StompClientContext";
import { useAdmin } from "./AdminProvider";
import {ApiResponse} from '../interfaces/ApiResponse';
import { getMentees, saveMentees } from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";

type MenteesContextAPI = {
    mentees: Mentee[],
    fetch: ()=> void,
}

const menteesCompareFn = (a:Mentee, b:Mentee)=> (new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());


const MenteesContext = createContext<MenteesContextAPI | null>(null);

/**
 * Responsible for accessing an admin's mentees.
 * 
 * Must be used within `MenteesProvider`
 * @author Teninlanimi Taiwo
 */
export const useMentees = ()=>{
    const context = useContext(MenteesContext);

    if(!context){
        throw new Error('useMentees must be used within MenteesProvider');
    }

    return context
}

/**
 * Provider responsible for exposing mentees websocket and context in the app globally.
 * @author Teninlanimi Taiwo
 */
export function MenteesProvider({children} : {children?:React.JSX.Element}){
    const [mentees, setMenteesRaw] = useState<Mentee[]>(getMentees());

    const {subscribe, publish} = useStompClient();
    const {admin} = useAdmin()

    useEffect(()=>{
        subscribe(`/mentees/${admin?.id}`, message =>{
            const body = JSON.parse(message.body);
            
            const data = (body as ApiResponse).data;

            if (Array.isArray(data)) {
                const _mentees = data.map((data) => data as Mentee);
            
                setMentees(distinctList(_mentees, 'id', menteesCompareFn));
            } else {
                const mentee = data as Mentee;
                setMentees(distinctList([...Array.from(mentees), mentee], 'id', menteesCompareFn))
            }
        })

        publish(`/scholarly/getMentees/${admin?.id}`)

    }, [admin])

    const setMentees = useCallback((_mentees: Mentee[])=>{
        saveMentees(_mentees);
        setMenteesRaw(_mentees);
    }, [])

    const fetch = useCallback(()=>{
        publish(`/scholarly/getMentees/${admin?.id}`);
    }, [])


    return <MenteesContext.Provider value={{mentees, fetch}}>
        {children}
    </MenteesContext.Provider>
}
