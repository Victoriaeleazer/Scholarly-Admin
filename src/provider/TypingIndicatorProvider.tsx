
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import {ApiResponse} from '../interfaces/ApiResponse';
import { getChats, saveChats} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import { Chat } from "../interfaces/Chat";
import { useParams } from "react-router";
import { TypingIndicator } from "../interfaces/TypingIndicator";
import { useAdmin } from "./AdminProvider";

interface TypingIndicatorAPI {
    indicator: TypingIndicator | undefined,
    setTyping: (dmId: string, isTyping: boolean) => void
}

const TypingIndicatorContext = createContext<TypingIndicatorAPI | null>(null);

/**
 * Responsible for reading, and checking Typing Indicator.
 * 
 * Must be used within `TypingIndicatorProvider`
 * @author Teninlanimi Taiwo
 */
export const useTypingIndicator = (): TypingIndicatorAPI =>{
    const context = useContext(TypingIndicatorContext);

    if(!context){
        throw new Error("useTypingIndicator must be used withing TypingIndicatorProvider");
    }

    return context;
}


/**
 * Provider responsible for exposing Typing Indicator Status per DM.
 * Listens to channels websocket and updates them
 * Must be used within the `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function TypingIndicatorProvider({children, dmId}: {dmId?: string, children?: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();

    const {admin} = useAdmin();


    const [typingIndicator, setTypingIndicatorRaw] = useState<TypingIndicator | undefined>(undefined)
    

    useEffect(()=>{

        if(!dmId)return;

      

        subscribe(`/typing/${dmId}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = body as TypingIndicator;

            console.log(`Got TypeingStatus`, data);

            if(!data) return;

            setTypingIndicator(data);
        });

    }, [dmId])
    
    const setTypingIndicator = useCallback((typingIndicator: TypingIndicator)=>{
        setTypingIndicatorRaw(typingIndicator);

    }, [])


    const setTyping = useCallback((dmId: string, typing: boolean)=>{
        publish(`/scholarly/showTyping/${dmId}`, JSON.stringify({
            dmId,
            isTyping: typing,
            typer: admin?.id ?? ''
        } as TypingIndicator))

    }, [])

    return <TypingIndicatorContext.Provider value={{indicator:typingIndicator, setTyping}}>
        {children}
    </TypingIndicatorContext.Provider>
}