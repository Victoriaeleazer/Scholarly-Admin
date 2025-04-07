export interface Mentee{
    menteeTitle: any;
    status : 'new' | 'pending' | 'confirmed',
    id : string,
    firstName: string,
    lastName : string,
    profile? : string,
    color: string,
    date: string
}