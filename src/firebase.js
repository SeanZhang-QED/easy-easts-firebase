import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import * as firestore from "firebase/firestore";
import {getAuth} from "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const timestamp = firestore.serverTimestamp;

export { auth, storage, db, timestamp };

export default app;