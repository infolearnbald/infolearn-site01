// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  onAuthStateChanged, 
  updateProfile, 
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// TUAS CONFIGS DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDWM3VAjFNtM4l_UaEg2r0e04sFVJMXudw",
  authDomain: "infolearn-academy-89bee.firebaseapp.com",
  projectId: "infolearn-academy-89bee",
  storageBucket: "infolearn-academy-89bee.firebasestorage.app",
  messagingSenderId: "65886712812",
  appId: "1:65886712812:web:0fc810717e31b83b86c9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Função para validar formato do e-mail
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Register
export async function registerWithEmail(name, email, password) {
  if (!validarEmail(email)) throw new Error("Digite um e-mail válido.");
  if (password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");

  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // Atualiza o nome do usuário
  await updateProfile(user, { displayName: name });

  // Envia e-mail de verificação
  await sendEmailVerification(user);

  // Salva dados no Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    createdAt: new Date().toISOString(),
    emailVerified: false
  });

  return user;
}

// Login com verificação de e-mail
export async function loginWithEmail(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const user = res.user;

  if (!user.emailVerified) {
    throw new Error("E-mail não verificado. Por favor, verifique sua caixa de entrada.");
  }

  return user;
}

// Password reset
export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
  return true;
}

// Get current user (promise)
export async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

// save/update center doc
export async function saveOrUpdateCenter(userId, data) {
  if (!userId) throw new Error("User ID required");
  const refDoc = doc(db, "centers", userId);
  await setDoc(refDoc, data, { merge: true });
  return true;
}

// get center
export async function getCenterByUserId(userId) {
  if (!userId) return null;
  const refDoc = doc(db, "centers", userId);
  const snap = await getDoc(refDoc);
  return snap.exists() ? snap.data() : null;
}

// upload file and return URL
export async function uploadFileToStorage(path, file) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

// save enrollment
export async function saveEnrollmentToFirestore(enrollment) {
  const col = collection(db, 'enrollments');
  const docRef = await addDoc(col, enrollment);
  return docRef.id;
}

// expose some functions for quick use in other scripts
window.saveEnrollmentToFirestore = saveEnrollmentToFirestore;
window.getCurrentUser = getCurrentUser;
window.getCenterByUserId = getCenterByUserId;
window.uploadFileToStorage = uploadFileToStorage;
