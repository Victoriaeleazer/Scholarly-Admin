import axios, { AxiosResponse } from "axios";
import { AdminRole } from "../interfaces/Admin";
import { Chat } from "../interfaces/Chat";
import { Channel } from "../interfaces/Channel";
import { ApiResponse } from "../interfaces/ApiResponse";
import { getAdminUserData } from "./user-storage";

export const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

export const websocket_url = import.meta.env.VITE_BACKEND_WEBSOCKET_URL;


const headers = {"Content-Type": 'application/json'};

// To prevent axios from throwinf any errors
const axiosInstance = axios.create({
    validateStatus: ()=> true
})

export async function loginAccount(emailOrPhoneNumber:string, password:string){
    const reqBody = {password}
    /// To determin whether it's email or phone number
    reqBody[emailOrPhoneNumber.includes('@')? 'email':'phoneNumber'] = emailOrPhoneNumber;

    const response = await axiosInstance.post(`${baseUrl}/auth/login`, reqBody, {headers:headers});

    return response;
}

export async function registerAccount(email:string, phoneNumber:string, firstName:string, lastName:string, role: AdminRole | string, password:string, playerId: string){
    const reqBody = {password, email, phoneNumber, firstName, lastName, role, playerId}

    const response = await axiosInstance.post(`${baseUrl}/auth/register`, reqBody, {headers:headers});

    return response;
}

export async function updateToken(id: string){

    const response = await axiosInstance.patch(`${baseUrl}/auth/updateToken/${id}`, null, {headers:headers});

    return response;
}

export async function sendChat(channelId:string, chat:Chat){
    
    const reqBody = chat;
    const pathVariables = `${channelId}/${chat.senderId}`;

    const response = await axiosInstance.post(
        `${baseUrl}/chat/sendChat/${pathVariables}`,
        chat,
        {headers:headers}
    );

    return response;
}

export async function sendAttachment(channelId:string, attachment:File, chat:Chat, thumbnail?:Blob | null){
    const pathVariables = `${channelId}/${chat.senderId}`;

    const formData = new FormData();
    formData.append('attachment', attachment);
    formData.append('attachmentType', chat.attachmentType);
    if(chat.message){
        formData.append('message', chat.message)
    }

    if(thumbnail && chat.attachmentType === 'video'){
        formData.append('thumbnail', thumbnail);
    }

    console.log(formData.get("attachment"));
    console.log(formData);

    const response = await axiosInstance.post(
        `${baseUrl}/chat/sendAttachment/${pathVariables}`,
        formData,
        {headers:{"Content-Type":'multipart/form-data'}}
    );

    return response;
}

export async function markChatAsRead(channelId:string, chatId:string, memberId:string){
    const pathVariables = `${channelId}/${memberId}/${chatId}`;

    const response = await axiosInstance.patch(`${baseUrl}/chat/markChatAsRead/${pathVariables}`, null,{headers:headers})
}

export async function createChannel(channel:Channel, adminId:string){
    const pathVariables = `${adminId}`
    const response = await axiosInstance.post(`${baseUrl}/channel/createChannel/${pathVariables}`, channel, {headers:headers})
    return response;
}

export async function sendInvitation(channelId:string, email:string){
    const pathVariables = `${channelId}`
    const response = await axiosInstance.post(`${baseUrl}/channel/sendInvitation/${pathVariables}`, {email}, {headers:headers})
    return response;
}

export async function removeMember(channelId:string, memberId:string){
    const pathVariables = `${channelId}/${memberId}`
    const response = await axiosInstance.patch(`${baseUrl}/channel/removeMember/${pathVariables}`, null, {headers:headers})
    return response;
}

export async function acceptInvitation(invitationId: string, accept: boolean){
    const pathVariables = `${invitationId}`
    const response = await axiosInstance.patch(`${baseUrl}/channel/respondToInvitation/${pathVariables}`, {accept}, {headers:headers})
    return response;
}

export async function markNotification(notificationId: string, read: boolean){
    const pathVariables = `${notificationId}`
    const response = await axiosInstance.patch(`${baseUrl}/notification/markAsRead/${pathVariables}`, {read}, {headers:headers})
    return response;
}

export async function updateChannelPhoto(channelId: string, profile: File){
    const pathVariables = `${channelId}`;

    const formData = new FormData();
    formData.append('file', profile);

    const response = await axiosInstance.patch(
        `${baseUrl}/channel/updateChannelProfile/${pathVariables}`,
        formData,
        {headers:{"Content-Type":'multipart/form-data'}}
    );

    return response;
}

export async function searchUser(name: string){
    const response = await axiosInstance.post(`${baseUrl}/chat/searchUser`, {search: name}, {headers:headers})
    return response;
}

export async function startChat(receipientId: string){
    const response = await axiosInstance.post(`${baseUrl}/chat/startChat/${getAdminUserData().id}/${receipientId}`, {headers:headers})
    return response;
}