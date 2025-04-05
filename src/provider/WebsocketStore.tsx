import React from "react"
import { StompClientProvider } from "./StompClientContext"
import { AdminProvider } from "./AdminProvider"
import { MenteesProvider } from "./MenteesProvider"
import { NotificationsProvider } from "./NotificationsProvider"
import { DirectMessagesProvider } from "./DirectMessagesProvider"
import { EventsProvider } from "./EventsProvider"
import { ChannelsProvider } from "./ChannelsProvider"
import { BatchesProvider } from "./BatchesProvider"
import { CoursesProvider } from "./CoursesProvider"
import { AdminsProvider } from "./AdminsProvider"

const WebsocketStore = ({children}: {children?:React.JSX.Element}) =>{
    return <AdminProvider>
        <StompClientProvider>
            <AdminsProvider>
                <MenteesProvider>
                    <NotificationsProvider>
                        <DirectMessagesProvider>
                            <ChannelsProvider>
                                <EventsProvider>
                                    <BatchesProvider>
                                        <CoursesProvider>
                                            {children}
                                        </CoursesProvider>
                                    </BatchesProvider>
                                </EventsProvider>
                            </ChannelsProvider>
                        </DirectMessagesProvider>
                    </NotificationsProvider>
                </MenteesProvider>
            </AdminsProvider>
    </StompClientProvider>

        </AdminProvider>
}

export default WebsocketStore