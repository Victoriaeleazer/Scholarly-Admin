
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import { useAdmin } from "./AdminProvider";
import {ApiResponse, Delete} from '../interfaces/ApiResponse';
import { getChannels, saveChannels} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import { Channel } from "../interfaces/Channel";

type ChannelsContextAPI = {
    channels: Channel[],
    fetch: ()=> void,
}

const channelsCompareFn = (a:Channel, b:Channel)=> (new Date(b.latestMessage?.timestamp ?? b.createdAt).getTime() - new Date(a.latestMessage?.timestamp ?? a.createdAt).getTime());


const ChannelsContext = createContext<ChannelsContextAPI | null>(null);

/**
 * Responsible for accessing an admin's channels.
 * 
 * Must be used within `ChannelsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChannels = ()=>{
    const context = useContext(ChannelsContext);

    if(!context){
        throw new Error('useChannels must be used within ChannelsProvider');
    }

    return context
}

/**
 * Responsible for accessing a channel.
 * 
 * Must be used within `ChannelsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChannel = (dmId: string): Channel | undefined =>{
    const context = useContext(ChannelsContext);

    if(!context){
        throw new Error('useChannel must be used within ChannelsProvider');
    }

    const {channels} = context
    const channel = channels.find(_dm => _dm.id === dmId);
    if(!channel){
        console.error("Channel doesn't exist")
    }
    return channel
}

/**
 * Provider responsible for exposing Channels websocket and context in the app globally.
 * @author Teninlanimi Taiwo
 */
export function ChannelsProvider({children} : {children?:React.JSX.Element}){
    const [channels, setChannelsRaw] = useState<Channel[]>(getChannels());

    const {subscribe, publish} = useStompClient();
    const {admin} = useAdmin()

    useEffect(()=>{
        subscribe(`/channels/${admin?.id}`, message =>{
            const body = JSON.parse(message.body);

            if(body.deleted !== undefined || body.deleted){
                console.log("Channel Delete Request Gotten: ", body);
                const deleteData = body as Delete;
                const exists = channels.some(channel => channel.id === deleteData.id);

                if(deleteData.deleted && exists){
                    const _channels = channels.filter(c => c.id !== deleteData.id);
                    setChannels(distinctList(_channels, 'id', channelsCompareFn));
                }

                return;
            }
            
            const data = (body as ApiResponse).data;
            console.log("Channels gotten: ", data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _channels = data.filter(_c => _c !== undefined).map((data) => data as Channel);
            
                setChannels(distinctList(_channels, 'id', channelsCompareFn));
            } else {
                const channel = data as Channel;
                setChannels(distinctList([...Array.from(channels), channel], 'id', channelsCompareFn))
            }
        })

        
        fetchChannels()

    }, [])

    const fetchChannels = useCallback(()=>{
        publish(`/scholarly/getUserChannels/${admin?.id}`);
    }, [])

    const setChannels = useCallback((_channels: Channel[])=>{
        saveChannels(_channels);
        setChannelsRaw(_channels);
    }, [])


    return <ChannelsContext.Provider value={{channels, fetch:fetchChannels}}>
        {children}
    </ChannelsContext.Provider>
}
