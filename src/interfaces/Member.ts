export interface Member{
    firstName:string,
    id:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    profile?:string | undefined,
    role: 'admin' | 'student'
}