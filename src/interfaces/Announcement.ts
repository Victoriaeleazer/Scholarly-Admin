import { User } from "./User";

export interface Announcement{
    id:string,
    announcementTitle:string,
    announcementDescription:string,
    audience: string[] | User[],
    createdTime: string,
    announcementPhoto?:string | undefined,
}