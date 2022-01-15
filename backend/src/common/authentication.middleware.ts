import { Injectable, NestMiddleware } from '@nestjs/common'
import * as jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { Request, Response } from 'express'
import admin from 'src/config/firebase-config'
// Custom
import keys from '../config/keys'
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    // eslint-disable-next-line @typescript-eslint/ban-types
    async use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodedValue = await admin.auth().verifyIdToken(token)
            if (decodedValue) {
                return next()
            }
            return res.json({ message: 'Unauthorized Request' })
        } catch (e) {
            return res.json({
                message: 'Sorry, we are unable to process your request.',
            })
        }
    }
}
