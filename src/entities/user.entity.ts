import { Activity } from './activity.entity';
// export type User = {
//     __v?: number,
//     displayName: string,
//     email?: string,
//     phoneNumber?: string,
//     photoURL: string,
//     uid: string,
//     _id?: string,
//     providerData?: any[],
//     dateCreated?: Date,
//     dateDeleted?: Date
// }

export type User = {
    activities?: Activity[],
    createdDate?: Date,
    firstName?: string,
    id?: string,
    lastName?: string,
    token?: string,
    userName?: string
}