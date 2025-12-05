// auth.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// SUA CONFIG DO FIREBASE (já fornecida)
const firebaseConfig = {
  apiKey: "AIzaSyDWM3VAjFNtM4l_UaEg2r0e04sFVJMXudw",
  authDomain: "infolearn-academy-89bee.firebaseapp.com",
  projectId: "infolearn-academy-89bee",
  storageBucket: "infolearn-academy-89bee.firebasestorage.app",
  messagingSenderId: "65886712812",
  appId: "1:65886712812:web:0fc810717e31b83b86c9"
};

// inicializa
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// registra usuário e salva perfil no Firestore
export async function registerWithEmail(name, email, password) {
  if (password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  // salva perfil mínimo
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    createdAt: new Date().toISOString()
  });
  return user;
}

// login
export async function loginWithEmail(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

// reset password
export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
  return true;
}

// opcional: monitorar estado auth
export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

