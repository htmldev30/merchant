import { Document } from 'mongoose'
export interface ISellerRequest extends Document {
    readonly shopName: string
    readonly shopCategory: string
    readonly shopDetails: string
    readonly shopReferences: string
    readonly userProfileId: string
    readonly isApproved: boolean
}
