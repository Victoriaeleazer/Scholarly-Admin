import { Admin } from "./Admin";

export interface Student{
    id:string,
    firstName:string,
    lastName:string,
    fullName:string,
    color: string,
    profile?:string,
    email:string,
    phoneNumber:string,
    createdAt:string,
    counselor: Admin
}