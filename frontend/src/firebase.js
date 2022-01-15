import {
    FIREBASE_API_KEY,
    FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSASSING_SENDER_ID,
    FIREBASE_APP_ID,
} from '@env'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${FIREBASE_API_KEY}`,
    authDomain: `${FIREBASE_AUTHDOMAIN}`,
    projectId: `${FIREBASE_PROJECT_ID}`,
    storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${FIREBASE_MESSASSING_SENDER_ID}`,
    appId: `${FIREBASE_APP_ID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {
    auth,
    sendEmailVerification,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
}
