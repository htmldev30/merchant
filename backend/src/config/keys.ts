import * as dotenv from 'dotenv'
dotenv.config()

export default {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_JWKS_URI: process.env.AUTH0_JWKS_URI,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
}
