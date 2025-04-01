import React from "react"
import { StompClientProvider } from "./StompClientContext"
import { AdminProvider } from "./AdminProvider"
import { MenteesProvider } from "./MenteesProvider"
import { NotificationsProvider } from "./NotificationsProvider"
import { DirectMessagesProvider } from "./DirectMessagesProvider"
import { EventsProvider } from "./EventsProvider"
import { ChannelsProvider } from "./ChannelsProvider"
import { BatchesProvider } from "./BatchesProvider"

const WebsocketStore = ({children}: {children?:React.JSX.Element}) =>{
    return <AdminProvider>
        <StompClientProvider>
            <MenteesProvider>
                <NotificationsProvider>
                    <DirectMessagesProvider>
                        <ChannelsProvider>
                            <EventsProvider>
                                <BatchesProvider>
                                    {children}
                                </BatchesProvider>
                            </EventsProvider>
                        </ChannelsProvider>
                    </DirectMessagesProvider>
                </NotificationsProvider>
            </MenteesProvider>
    </StompClientProvider>

        </AdminProvider>
}

export default WebsocketStore