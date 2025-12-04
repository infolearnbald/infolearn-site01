import { auth, signOut } from './firebase.js';

document.getElementById('btn-logout').addEventListener('click', ()=>{
  signOut(auth).then(()=>{
    alert('Logout realizado!');
    window.location.href = 'index.html';
  }).catch(err=>{
    console.error(err);
  });
});

// Exibir nome do usuário fictício (ou pegar do Firebase Auth)
const userName = "Ropson Gustavo";
document.getElementById('user-name').innerText = userName;

// Cursos do usuário
const lista = document.getElementById('lista-cursos');
const cursos = ["Inglês Corporativo","Design Gráfico","Macro-Study IA"];
cursos.forEach(curso=>{
  const li = document.createElement('li');
  li.textContent = curso;
  lista.appendChild(li);
});
