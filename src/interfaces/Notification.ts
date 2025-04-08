export interface Notification{
    id: string,
    title: string,
    content: string,
    timestamp: string,
    read: boolean,
    target? : string,
    category? : 'invitation' | 'channel' | 'event' | 'announcement' | 'feedback' | 'account' | 'student' | 'batch' | 'course' | 'other'
}