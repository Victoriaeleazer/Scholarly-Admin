import { Admin } from "./Admin";
import { Course } from "./Course";
import { User } from "./User";

export interface Batch{
    id:string,
    batchName: string,
    course: Course,
    faculty: User, // More strictly an admin
    startPeriod: string,
    endPeriod: string,
    members:  User[],
    paidMembers: User[],
}