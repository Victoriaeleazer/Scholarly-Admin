import { Admin } from "./Admin";
import { Course } from "./Course";
import { Member } from "./Member";

export interface Batch{
    id:string,
    course: string | Course,
    startPeriod:string,
    endPeriod:string,
    admin: string | Admin,
    candidates: string[] | Member[]
}