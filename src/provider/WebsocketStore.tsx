import React from "react"
import { StompClientProvider } from "./StompClientContext"
import { AdminProvider } from "./AdminProvider"
import { MenteesProvider } from "./MenteesProvider"
import { NotificationsProvider } from "./NotificationsProvider"
import { DirectMessagesProvider } from "./DirectMessagesProvider"
import { EventsProvider } from "./EventsProvider"

const WebsocketStore = ({children}: {children?:React.JSX.Element}) =>{
    return <AdminProvider>
        <StompClientProvider>
            <MenteesProvider>
                <NotificationsProvider>
                    <DirectMessagesProvider>
                        <EventsProvider>
                            {children}
                        </EventsProvider>
                    </DirectMessagesProvider>
                </NotificationsProvider>
            </MenteesProvider>
    </StompClientProvider>

        </AdminProvider>
}

export default WebsocketStore