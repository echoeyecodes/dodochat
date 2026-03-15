import envConfig from "@/lib/env";
import admin from "firebase-admin";

const privateKeyB64 = envConfig.get("FIREBASE_PRIVATE_KEY")!;
const rawKey = Buffer.from(privateKeyB64, "base64").toString("utf8");
const credential = admin.credential.cert({
    projectId: envConfig.get("FIREBASE_PROJECT_ID"),
    clientEmail: envConfig.get("FIREBASE_CLIENT_EMAIL"),
    privateKey: rawKey,
});

if (!admin.apps.length) {
    admin.initializeApp({
        credential,
    });
}

export const verifyFirebaseToken = async (idToken: string) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying Firebase token:", error);
        throw error;
    }
};
