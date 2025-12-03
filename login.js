// login.js - Auth com Firebase (Auth + Firestore user doc)
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');
const msg = document.getElementById('msg');

loginForm?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  try{
    await signInWithEmailAndPassword(auth, email, pass);
    msg.innerText = 'Sessão iniciada.';
    window.location.href = 'perfil.html';
  }catch(err){
    msg.innerText = 'Erro: ' + err.message;
  }
});

registerForm?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const nome = document.getElementById('rNome').value;
  const email = document.getElementById('rEmail').value;
  const pass = document.getElementById('rPass').value;
  const idade = document.getElementById('rIdade').value;
  const provincia = document.getElementById('rProvincia').value;
  const genero = document.getElementById('rGenero').value;
  try{
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCred.user.uid;
    // create user doc
    await setDoc(doc(db, 'users', uid), {
      nome, email, idade:idade||null, provincia:provincia||null, genero:genero||null, createdAt: new Date().toISOString()
    });
    await sendEmailVerification(userCred.user);
    msg.innerText = 'Conta criada. Verifique seu e-mail. A ser redirecionado...';
    window.location.href = 'perfil.html';
  }catch(err){
    msg.innerText = 'Erro: ' + err.message;
  }
});

logoutBtn?.addEventListener('click', async ()=>{
  await signOut(auth);
  window.location.href = 'index.html';
});

onAuthStateChanged(auth, (user)=>{
  if(user) {
    // logged
  } else {
    // not logged
  }
});

