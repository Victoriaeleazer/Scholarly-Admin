import { Member } from "./Member";
import {Chat} from './Chat'

export interface Channel{
    id:string,
    channelName:string,
    channelDescription:string,
    channelProfile?:string,
    creator: string | Member,
    createdAt:string,
    members:Member[],
    channelType: 'announcement' | 'project' | 'qa',
    latestMessage:Chat,
    unreadMessages:number,

}