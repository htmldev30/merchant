import { Document } from 'mongoose'

export interface IUserProfile extends Document {
    readonly username: string
    readonly displayName: string
    readonly bio: string
    readonly avatar: string
    readonly isVerified: boolean
    readonly isSeller: boolean
    readonly userId: string
}
