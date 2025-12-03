// auth.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user)=>{
  const navPerfil = document.getElementById('navPerfil');
  if(user){
    // tenta obter nome do Firestore
    try {
      const d = await getDoc(doc(db, 'users', user.uid));
      const name = d.exists() ? (d.data().name || user.email) : user.email;
      if(navPerfil) navPerfil.textContent = name;
    } catch(e){
      if(navPerfil) navPerfil.textContent = user.email;
    }
  } else {
    if(navPerfil) navPerfil.textContent = 'Perfil';
  }
});

// função pública de logout
window.logout = async function(){
  try { await signOut(auth); location.href = 'index.html'; }
  catch(e){ alert('Erro ao sair: '+e.message); }
};