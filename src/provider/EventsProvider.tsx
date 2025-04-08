
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import {ApiResponse} from '../interfaces/ApiResponse';
import { getChats, getEvents, saveChats, saveEvents} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import {Event} from "../interfaces/Event";
import { useParams } from "react-router";
import { useAdmin } from "./AdminProvider";

interface EventsAPI {
    events: Event[],
    setEvents: (events: Event[]) => void,
    addEvent: (event: Event) => void,
    removeEvent: (eventId: string) => void,
}

const EventsContext = createContext<EventsAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting chats of a channel globally within the app.
 * 
 * Must be used within `EventsProvider`
 * @author Teninlanimi Taiwo
 */
export const useEvents = (): EventsAPI =>{
    const context = useContext(EventsContext);

    if(!context){
        throw new Error("useEvents must be used withing EventsProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to an event based on the `eventId`.
 * This can be used anywhere.
 * 
 * Must be used within `EventsProvider`
 * @author Teninlanimi Taiwo
 */
export const useEvent = (chatId: string | String) : Event =>{
    const context = useContext(EventsContext);

    if(!context){
        throw new Error("useEvent must be used withing EventsProvider");
    }

    const event = context.events.find(chat => chat.id === chatId);

    if(!event){
        throw new Error("Event couldn't be found");
    }

    return event;
}

const eventsCompareFn = (a:Event, b:Event)=> (new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime());

/**
 * Provider responsible for exposing events context in the app globally.
 * Listens to channels websocket and updates them
 * Must be used within the `AdminProvider` & `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function EventsProvider({children}: {children?: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();
    const {dmId: eventId} = useParams();


    const [events, setEventsRaw] = useState<Event[]>(getEvents())
    const {admin} = useAdmin();

    // To initialize the events from local storage
    useEffect(()=>{
        setEvents(getEvents())
    }, [])

    useEffect(()=>{
        saveEvents(events);
    }, [events])

    

    useEffect(()=>{      

        subscribe(`/events/${admin?.id}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got chats`, data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _chats = data.filter(_c => _c !== undefined).map((chat) => chat as Event);
                setEvents(_chats);
            } else {
                const chatData = data as Event;
                addEvent(chatData);
            }
        });

        publish(`/scholarly/getEvents/${admin?.id}`)

    }, [eventId])
    
    const addEvent = useCallback((event: Event)=>{
        setEventsRaw((prevEvents)=> distinctList([...prevEvents, event], 'id', eventsCompareFn))

    }, [])

    const setEvents = useCallback((_events: Event[])=>{
        setEventsRaw(distinctList(_events, 'id'))        
    }, [])

    const removeEvent = useCallback((eventId: string)=>{
        const capturedChats = [...events]
        const filtered = capturedChats.filter(event => event.id !== eventId);

        setEventsRaw(distinctList(filtered, 'id', eventsCompareFn));
    }, [])

    return <EventsContext.Provider value={{  events, addEvent, setEvents, removeEvent}}>
        {children}
    </EventsContext.Provider>
}