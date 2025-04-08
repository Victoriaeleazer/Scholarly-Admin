import {User } from "./User";

export interface Feedback{
    id:string,
    description:string,
    evidenceUrl:string,
    perpetrator:string | User,
    reporter:string | User,
    anonymous:string,
}