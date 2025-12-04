// firebase.js - conexao centralizada (modular v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWM3VAjFNtM4l_UaEg2r0e04sFVJMXudw",
  authDomain: "infolearn-academy-89bee.firebaseapp.com",
  projectId: "infolearn-academy-89bee",
  storageBucket: "infolearn-academy-89bee.appspot.com",
  messagingSenderId: "65886712812",
  appId: "1:65886712812:web:0fc810717e1f31b83b86c9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
