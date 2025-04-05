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

export enum Days {Mon="Monday", Tue="Tuesday", Wed="Wednesday", Thur="Thursday", Fri="Friday", Sat="Saturday", Sun="Sunday"};
export enum Months {January, February, March, April, May, June, July, August, September, October, November, December }