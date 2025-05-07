export interface Mentee{
    status : 'new' | 'pending' | 'confirmed',
    id : string,
    firstName: string,
    lastName : string,
    profile? : string,
    color: string,
    createdTime: string
    phoneNumber: string,
    email: string,  
}