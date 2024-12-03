import { Admin } from "../interfaces/Admin";
import { Channel } from "../interfaces/Channel";

export function saveAdminUserData(data:Admin){
    localStorage.setItem('userdata', JSON.stringify(data))
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