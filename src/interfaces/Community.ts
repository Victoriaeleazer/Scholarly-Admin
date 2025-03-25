import { Channel } from "./Channel";
import { Member } from "./Member";

export interface Community{
    id: string,

    communityName: string,
    communityDescription: string,
    communityProfile: string,

    creator: string | Member,
    createdAt: string,
    color: string,
    members: (string | Member)[]
    channels: (string | Channel)[]
}