import { User } from "./User";

export interface Course{
    id:string,
    courseName:string,
    coursePhoto: string,
    courseDescription: string,
    recommendedPrice?: number,
    createdAt: string,
    students: User[]

}