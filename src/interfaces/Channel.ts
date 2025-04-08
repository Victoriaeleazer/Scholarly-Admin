import { User } from "./User";
import {Chat} from './Chat'
import { Community } from "./Community";

export interface Channel{
    id:string,
    channelName:string,
    channelDescription:string,
    channelProfile?:string,
    creator?: User,
    color:string,
    createdAt:string,
    members:User[],
    channelType: 'announcement' | 'project' | 'qa',
    latestMessage:Chat,
    unreadMessages:number,

    communityId: string,
    community?: Community,

}