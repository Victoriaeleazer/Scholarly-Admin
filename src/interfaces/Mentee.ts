export interface Mentee{
    status : 'new' | 'pending' | 'confirmed',
    id : string,
    firstName: string,
    lastName : string,
    profile? : string,
    color: string,
    date: string
}