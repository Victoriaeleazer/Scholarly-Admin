import { AdminRole } from "./Admin";

export interface User{
    firstName:string,
    id:string,
    lastName:string,
    email:string,
    color: string,
    phoneNumber:string,
    profile?:string | undefined,
    role: 'admin' | 'student' | AdminRole
}
