import { Channel } from "./Channel";
import { User } from "./User";

export interface Community{
    id: string,

    communityName: string,
    communityDescription: string,
    communityProfile: string,
    creator: User,
    createdAt: string,
    color: string,
    members: (string | User)[]
    channels: (string | Channel)[]
}