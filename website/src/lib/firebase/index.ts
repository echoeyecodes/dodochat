import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import envConfig from "@/lib/env";

const firebaseConfig = {
    apiKey: envConfig.get("FIREBASE_API_KEY"),
    authDomain: envConfig.get("FIREBASE_AUTH_DOMAIN"),
    projectId: envConfig.get("FIREBASE_PROJECT_ID"),
    storageBucket: envConfig.get("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: envConfig.get("FIREBASE_MESSAGING_SENDER_ID"),
    appId: envConfig.get("FIREBASE_APP_ID"),
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
