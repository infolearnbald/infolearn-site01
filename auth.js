// auth.js
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

/**
 * Use this on protected pages:
 * await requireVerifiedUser();
 * it redirects to login if not logged/verified.
 */
export function requireVerifiedUser(redirectTo = 'login.html'){
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = redirectTo;
      return;
    }
    // If email not verified, redirect to a verify page (or login)
    if (!user.emailVerified) {
      alert('Por favor, verifique o seu e-mail antes de continuar. Um e-mail foi enviado ao seu endereço.');
      window.location.href = 'verify.html';
      return;
    }
  });
}

/**
 * Quick function to get current user's profile doc
 */
export async function getUserProfile(uid){
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

/**
 * Send verification email (wrap)
 */
export async function sendVerification(user){
  await sendEmailVerification(user);
}
