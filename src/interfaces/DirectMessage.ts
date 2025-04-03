import { Chat } from "./Chat";
import { Community } from "./Community";
import { User } from "./User";

export interface DirectMessage{
    id: string,
    name: string,
    profile: string,
    color: string,
    recipients: User[],
    latestMessage?: Chat,
    time: string,
    unreadMessages: number,
    community: Community,
}