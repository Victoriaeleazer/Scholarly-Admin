import { Member } from "./Member";

export interface Feedback{
    id:string,
    description:string,
    evidenceUrl:string,
    perpetrator:string | Member,
    reporter:string | Member,
    anonymous:string,
}