import { Admin } from "../interfaces/Admin";
import { Channel } from "../interfaces/Channel";
import { Chat } from "../interfaces/Chat";
import {Event} from "../interfaces/Event"
import { DirectMessage } from "../interfaces/DirectMessage";
import { Mentee } from "../interfaces/Mentee";
import { Notification } from "../interfaces/Notification";

export function saveAdminUserData(data:Admin){
    localStorage.setItem('userdata', JSON.stringify(data))
}

export function saveCallToken(token: string){
    localStorage.setItem('call-token', token);
}

export function getCallToken():string | undefined{
    return (localStorage.getItem('call-token') as string | undefined);
}

export function hasAdminUserData():boolean{
    const rawData = localStorage.getItem('userdata');

    return rawData !== null;
}

export function getAdminUserData(): Admin{

    const rawData = localStorage.getItem('userdata');

    return JSON.parse(rawData!) as Admin;
}

export function saveChannels(channels: Channel[]){
    localStorage.setItem('channels', JSON.stringify(channels));
}

export function getChannels() : Channel[]{
    return JSON.parse(localStorage.getItem('channels') ?? '[]');
}

export function getChannel(channelId:string): Channel | undefined | null{
    return getChannels().find(channel => channelId === channel.id);
}

export function saveChats(dmId:string, chats: Chat[]){
    localStorage.setItem(`chats:${dmId}`, JSON.stringify(chats));
}

export function getChats(dmId: string): Chat[]{
    return JSON.parse(localStorage.getItem(`chats:${dmId}`) ?? '[]');
}

export function saveNotifications (notifications: Notification[]){
    localStorage.setItem("notifications", JSON.stringify(notifications))
}

export function getNotifications(): Notification[]{
    return JSON.parse(localStorage.getItem('notifications') ?? '[]');
}

export function saveMentees (mentees: Mentee[]){
    localStorage.setItem("mentees", JSON.stringify(mentees))
}

export function getMentees(): Mentee[]{
    return JSON.parse(localStorage.getItem('mentees') ?? '[]');
}

export function saveDMs (dms: DirectMessage[]){
    localStorage.setItem("dms", JSON.stringify(dms))
}

export function getDMs(): DirectMessage[]{
    return JSON.parse(localStorage.getItem('dms') ?? '[]');
}

export function saveEvents (events: Event[]){
    localStorage.setItem("events", JSON.stringify(events))
}

export function getEvents(): Event[]{
    return JSON.parse(localStorage.getItem('events') ?? '[]');
}

export function logout(){
    localStorage.clear();
}

