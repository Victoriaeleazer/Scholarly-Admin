import { Chat } from "./Chat";
import { Community } from "./Community";
import { Member } from "./Member";

export interface DirectMessage{
    id: string,
    name: string,
    profile: string,
    color: string,
    recipients: Member[],
    latestMessage?: Chat,
    time: string,
    unreadMessages: number,
    community: Community,
}