import { Admin } from "./Admin";
import { Course } from "./Course";
import { User } from "./User";

export interface Batch{
    id:string,
    course: Course,
    faculty: User, // More strictly an admin
    startDate: string,
    endDate: string,
    students:  User[]
}