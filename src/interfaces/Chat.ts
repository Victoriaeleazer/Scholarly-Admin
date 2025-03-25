import { Member } from "./Member"
export interface Chat{
    id:string,
    senderId:string,
    senderProfile:string,
    dmId:string,
    message?:string,
    attachment?:string,
    fileName?:string,
    thumbnail?:string,
    attachmentType:'image' | 'video' | 'audio' | 'document',
    messageType:'chat' | 'update' |'member' | 'create' | 'type'
    timestamp:string,
    readReceipt:string[],
}