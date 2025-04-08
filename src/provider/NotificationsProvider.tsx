
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import { useAdmin } from "./AdminProvider";
import {ApiResponse} from '../interfaces/ApiResponse';
import { Notification } from "../interfaces/Notification";
import { distinctList } from "../utils/ArrayUtils";
import { toast } from "sonner";
import { getNotifications, saveNotifications } from "../services/user-storage";

type NotificationsContextAPI = {
    notifications:Notification[],
}

const notificationCompareFn = (a:Notification, b:Notification)=> (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());


const NotificationsContext = createContext<NotificationsContextAPI | null>(null);

/**
 * Responsible for accessing an notifications.
 * 
 * Must be used within `NotificationProvider`
 * @author Teninlanimi Taiwo
 */
export const useNotifications = ()=>{
    const context = useContext(NotificationsContext);

    if(!context){
        throw new Error('useNotifications must be used within NotificationsProvider');
    }

    return context
}

/**
 * Provider responsible for exposing notifications websocket and context in the app globally.
 * @author Teninlanimi Taiwo
 */
export function NotificationsProvider({children} : {children?:React.JSX.Element}){
    const [notifications, setNotificationsRaw] = useState<Notification[]>(getNotifications());

    const {subscribe, publish} = useStompClient();
    const {admin} = useAdmin()

    useEffect(()=>{
        subscribe(`/notifications/${admin?.id}`, message =>{

            const body = JSON.parse(message.body);
            
            const data = (body as ApiResponse).data;

            if (Array.isArray(data)) {
                const _notifications = data.map((data) => data as Notification);
            
                setNotifications(distinctList(_notifications, 'id', notificationCompareFn));
                
                const _unread = _notifications.filter(notification => !notification.read).length;
                if(_unread > 0){
                toast.info("Unread Notifications", {id:'notifications',description:`You have ${_unread} unread notification${_unread !== 1 && "s"}`})

                }
            } else {
                const notification = data as Notification;
                if(!notification.read){
                toast.info(notification.title, {id:'notifications',description:notification.content});
                }
                setNotifications(distinctList([...Array.from(notifications), notification], 'id', notificationCompareFn))
            }
        })

        if(!admin) return;

        publish(`/scholarly/getNotifications/${admin?.id}`)

    }, [])

    const setNotifications = useCallback((_notifications: Notification[])=>{
        saveNotifications(_notifications);
        setNotificationsRaw(_notifications);
    }, [])


    return <NotificationsContext.Provider value={{notifications}}>
        {children}
    </NotificationsContext.Provider>
}
