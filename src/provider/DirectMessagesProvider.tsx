
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import { useAdmin } from "./AdminProvider";
import {ApiResponse, Delete} from '../interfaces/ApiResponse';
import { getDMs, saveDMs} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import { DirectMessage } from "../interfaces/DirectMessage";

type DirectMessagesContextAPI = {
    dms: DirectMessage[],
    fetch: ()=> void,
}

const dmsCompareFn = (a:DirectMessage, b:DirectMessage)=> (new Date(b.time).getTime() - new Date(a.time).getTime());


const DirectMessagesContext = createContext<DirectMessagesContextAPI | null>(null);

/**
 * Responsible for accessing an admin's dms.
 * 
 * Must be used within `DirectMessagesProvider`
 * @author Teninlanimi Taiwo
 */
export const useDirectMessages = ()=>{
    const context = useContext(DirectMessagesContext);

    if(!context){
        throw new Error('useDirectMessages must be used within DirectMessagesProvider');
    }

    return context
}

/**
 * Responsible for accessing a dm.
 * 
 * Must be used within `DirectMessagesProvider`
 * @author Teninlanimi Taiwo
 */
export const useDirectMessage = (dmId: string): DirectMessage | undefined =>{
    const context = useContext(DirectMessagesContext);

    if(!context){
        throw new Error('useDirectMessage must be used within DirectMessagesProvider');
    }

    const {dms} = context
    const dm = dms.find(_dm => _dm.id === dmId);
    if(!dm){
        console.error("DM doesn't exist")
    }
    return dm
}

/**
 * Provider responsible for exposing DirectMessages websocket and context in the app globally.
 * @author Teninlanimi Taiwo
 */
export function DirectMessagesProvider({children} : {children?:React.JSX.Element}){
    const [dms, setDirectMessagesRaw] = useState<DirectMessage[]>(getDMs());

    const {subscribe, publish} = useStompClient();
    const {admin} = useAdmin()

    useEffect(()=>{
        subscribe(`/dms/${admin?.id}`, message =>{
            const body = JSON.parse(message.body);

            if(body.deleted !== undefined || body.deleted){
                console.log("DM Delete Request Gotten: ", body);
                const deleteData = body as Delete;
                const exists = dms.some(dm => dm.id === deleteData.id);

                if(deleteData.deleted && exists){
                    const _dms = dms.filter(c => c.id !== deleteData.id);
                    setDirectMessages(distinctList(_dms, 'id', dmsCompareFn));
                }

                return;
            }
            
            const data = (body as ApiResponse).data;
            console.log("DMs gotten: ", data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _dms = data.filter(_c => _c !== undefined).map((data) => data as DirectMessage);
            
                setDirectMessages(distinctList(_dms, 'id', dmsCompareFn));
            } else {
                const dm = data as DirectMessage;
                setDirectMessages(distinctList([...Array.from(dms), dm], 'id', dmsCompareFn))
            }
        })

        
        fetchDirectMessages()

    }, [])

    const fetchDirectMessages = useCallback(()=>{
        publish(`/scholarly/getDirectMessages/${admin?.id}`);
    }, [])

    const setDirectMessages = useCallback((_dms: DirectMessage[])=>{
        saveDMs(_dms);
        setDirectMessagesRaw(_dms);
    }, [])


    return <DirectMessagesContext.Provider value={{dms, fetch:fetchDirectMessages}}>
        {children}
    </DirectMessagesContext.Provider>
}
