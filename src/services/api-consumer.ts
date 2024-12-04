import axios, { AxiosResponse } from "axios";
import { AdminRole } from "../interfaces/Admin";
import { Chat } from "../interfaces/Chat";

export const baseUrl = "https://scholarly-admin-backend.onrender.com/scholarly/api/v1";

export const websocket_url = "wss://scholarly-admin-backend.onrender.com/scholarly-websocket-endpoint"


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

export async function registerAccount(email:string, phoneNumber:string, firstName:string, lastName:string, role: AdminRole | string, password:string){
    const reqBody = {password, email, phoneNumber, firstName, lastName, role}

    const response = await axiosInstance.post(`${baseUrl}/auth/register`, reqBody, {headers:headers});

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

export async function sendAttachment(channelId:string, chat:Chat){
    const formData = new FormData();
    // formData.append('attachment', )
}