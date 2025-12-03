// userpanel.js
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user)=>{
  if(!user){ alert('É necessário iniciar sessão'); window.location.href = 'login.html'; return; }
  if(!user.emailVerified){ alert('Confirme seu e-mail para acessar o perfil.'); window.location.href = 'verify.html'; return; }
  const uid = user.uid;
  const udoc = await getDoc(doc(db, 'users', uid));
  const data = udoc.exists() ? udoc.data() : { name:user.email, email:user.email };
  renderProfile(data, uid);
});

function formatDate(ts){
  try { return new Date(ts.seconds * 1000).toLocaleString(); } catch(e){ return '-'; }
}

function renderProfile(data, uid){
  const main = document.getElementById('profileMain');
  main.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h2>${data.name || '-'}</h2>
        <div class="muted">${data.email || '-'}</div>
        <div class="muted">Criado em: ${data.createdAt ? (new Date(data.createdAt.seconds ? data.createdAt.seconds*1000 : data.createdAt).toLocaleString()) : '-'}</div>
      </div>
      <div>
        <button id="logoutBtn" class="btn secondary">Sair</button>
      </div>
    </div>
    <div style="margin-top:18px"><h3>Minhas Inscrições</h3><div id="myEnrolments" class="grid"></div></div>
  `;
  document.getElementById('logoutBtn').addEventListener('click', async ()=>{ await signOut(auth); window.location.href='index.html'; });
  loadEnrolments(uid);
}

async function loadEnrolments(uid){
  const q = query(collection(db, 'enrolments'), where('uid','==',uid));
  const snap = await getDocs(q);
  const container = document.getElementById('myEnrolments');
  container.innerHTML = '';
  if(snap.empty){ container.innerHTML = '<div class="muted">Sem inscrições.</div>'; return; }
  snap.forEach(docu=>{
    const d = docu.data();
    const div = document.createElement('div'); div.className='curso-card';
    div.innerHTML = `<h4>${d.courseTitle || d.courseTitle}</h4>
      <p class="muted">Status: ${d.status || '-'}</p>
      <p class="muted">Inscrito em: ${formatDate(d.createdAt)}</p>
    `;
    container.appendChild(div);
  });
}
