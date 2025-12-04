// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Config
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "infolearn-academy-89bee.firebaseapp.com",
  projectId: "infolearn-academy-89bee",
  storageBucket: "infolearn-academy-89bee.appspot.com",
  messagingSenderId: "65886712812",
  appId: "1:65886712812:web:0fc810717e1f31b83b86c9"
};

// Initialize
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
