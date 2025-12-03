// firebase.js (modular v12) - já com o teu SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBweoXgSwi4wTch7gEJVhnjAnH2pgWSRP4",
  authDomain: "infolearn-academy01.firebaseapp.com",
  projectId: "infolearn-academy01",
  storageBucket: "infolearn-academy01.firebasestorage.app",
  messagingSenderId: "981629503212",
  appId: "1:981629503212:web:6d0c61a7e50b750f4487c9",
  measurementId: "G-6PF8NB4MGZ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);