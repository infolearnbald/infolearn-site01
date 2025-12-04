// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDWM3VAjFNtM4l_UaEg2r0e04sFVJMXudw",
    authDomain: "infolearn-academy-89bee.firebaseapp.com",
    projectId: "infolearn-academy-89bee",
    storageBucket: "infolearn-academy-89bee.firebasestorage.app",
    messagingSenderId: "65886712812",
    appId: "1:65886712812:web:0fc810717e1f31b83b86c9"
};

// Start Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Helpers
export function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function resetUserPassword(email) {
    return sendPasswordResetEmail(auth, email);
}