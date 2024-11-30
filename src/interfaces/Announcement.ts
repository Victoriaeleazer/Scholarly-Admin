import { Member } from "./Member";

export interface Announcement{
    id:string,
    announcementTitle:string,
    announcementDescription:string,
    audience: string[] | Member[],
    createdTime: string,
    announcementPhoto?:string | undefined,
}