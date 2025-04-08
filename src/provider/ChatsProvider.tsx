
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import {ApiResponse} from '../interfaces/ApiResponse';
import { getChats, saveChats} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import { Chat } from "../interfaces/Chat";
import { useParams } from "react-router";

interface ChatsAPI {
    chats: Chat[],
    setChats: (chats: Chat[]) => void,
    addChat: (chat: Chat) => void,
    removeChat: (chatId: string) => void,
}

const ChatsContext = createContext<ChatsAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting chats of a channel globally within the app.
 * 
 * Must be used within `ChatsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChats = (): ChatsAPI =>{
    const context = useContext(ChatsContext);

    if(!context){
        throw new Error("useChats must be used withing ChatsProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to a cht based on the `chatId`.
 * This can be used anywhere.
 * 
 * Must be used within `ChatsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChat = (chatId: string | String) : Chat  =>{
    const context = useContext(ChatsContext);

    if(!context){
        throw new Error("useChat must be used withing ChatsProvider");
    }

    const chat = context.chats.find(chat => chat.id === chatId);

    if(!chat){
        throw new Error("Chat couldn't be found");
    }

    return chat;
}

const chatCompareFn = (a:Chat, b:Chat)=> (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

/**
 * Provider responsible for exposing chats context in the app globally.
 * Listens to channels websocket and updates them
 * Must be used within the `StudentProvider` & `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function ChatsProvider({children}: {children?: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();
    const {dmId} = useParams();


    const [chats, setChatsRaw] = useState<Chat[]>(getChats(dmId ?? ""))

    // To initialize the channels from local storage
    useEffect(()=>{
        setChats(getChats(dmId ?? ""))
    }, [])

    useEffect(()=>{
        saveChats(dmId!, chats);
    }, [chats])

    

    useEffect(()=>{
        
        if(!dmId) {
            console.error("DM ID is null");
            return;
        };

      

        subscribe(`/chats/${dmId}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got chats`, data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _chats = data.filter(_c => _c !== undefined).map((chat) => chat as Chat);
                setChats(_chats);
            } else {
                const chatData = data as Chat;
                addChat(chatData);
            }
        });

        publish(`/scholarly/getChats/${dmId}`)

    }, [dmId])
    
    const addChat = useCallback((chat: Chat)=>{
        setChatsRaw((prevChats)=> distinctList([...prevChats, chat], 'id', chatCompareFn))

    }, [])

    const setChats = useCallback((_chats: Chat[])=>{
        setChatsRaw(distinctList(_chats, 'id'))        
    }, [])

    const removeChat = useCallback((chatId: string)=>{
        const capturedChats = [...chats]
        const filtered = capturedChats.filter(chat => chat.id !== chatId);

        setChatsRaw(distinctList(filtered, 'id', chatCompareFn));
    }, [])

    return <ChatsContext.Provider value={{ chats: chats, addChat, setChats, removeChat}}>
        {children}
    </ChatsContext.Provider>
}