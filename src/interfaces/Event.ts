import { ReactNode } from "react";
import { User } from "./User";

export interface Event{
    title: ReactNode;
    id:string,
    eventTitle:string,
    eventDescription:string,
    audience: string[] | User[],
    keyInformation?: string[],
    eventPhoto?:string | undefined,
    createdTime:string,
    designatedTime:string
}