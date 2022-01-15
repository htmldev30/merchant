import { Document } from 'mongoose'

export interface IUserProfile extends Document {
    readonly username: string
    readonly displayName: string
    readonly bio: string
    readonly avatar: string
    readonly email: string
    readonly isVerified: boolean
    readonly isSeller: boolean
    readonly shopId: boolean
    readonly userId: string
}
