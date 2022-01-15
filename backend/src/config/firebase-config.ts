import admin from 'firebase-admin'
import keys from './keys'
const params = {
    type: keys.FIREBASE_TYPE,
    projectId: keys.FIREBASE_PROJECT_ID,
    privateKeyId: keys.FIREBASE_PRIVATE_KEY_ID,
    privateKey: keys.FIREBASE_PRIVATE_KEY,
    clientEmail: keys.FIREBASE_CLIENT_EMAIL,
    clientId: keys.FIREBASE_CLIENT_ID,
    authUri: keys.FIREBASE_AUTH_URI,
    tokenUri: keys.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: keys.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: keys.FIREBASE_CLIENT_X509_CERT_URL,
}
admin.initializeApp({
    credential: admin.credential.cert(params),
})

export default admin
