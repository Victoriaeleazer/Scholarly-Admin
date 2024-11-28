import { Member } from "./Member";

export interface Event{
    id:string,
    eventTitle:string,
    eventDescription:string,
    audience: string[] | Member[],
    keyInformation?: string[],
    eventPhoto?:string | undefined,
    createdTime:string,
    designatedTime:string
}