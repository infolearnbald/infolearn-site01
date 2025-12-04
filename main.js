import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// ======================
// Firebase Config
// ======================
const firebaseConfig = {
  apiKey: "AIzaSyDWM3VAjFNtM4l_UaEg2r0e04sFVJMXudw",
  authDomain: "infolearn-academy-89bee.firebaseapp.com",
  projectId: "infolearn-academy-89bee",
  storageBucket: "infolearn-academy-89bee.firebasestorage.app",
  messagingSenderId: "65886712812",
  appId: "1:65886712812:web:0fc810717e1f31b83b86c9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ======================
// Controle de abas
// ======================
window.abrirAba = function(abaId){
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('active'));
    document.getElementById(abaId).classList.add('active');
}

// ======================
// Inscrição via WhatsApp
// ======================
window.inscreverWhatsApp = function(event, numero, valor){
    event.preventDefault();
    alert(`Você será redirecionado ao WhatsApp do número ${numero} para pagamento de ${valor} MZN.`);
    window.open(`https://wa.me/${numero}?text=Olá,%20quero%20me%20inscrever`, "_blank");
}

// ======================
// Login e registro Centros
// ======================
window.loginCentro = function(){
    const email = document.getElementById('emailCentro').value;
    const senha = document.getElementById('senhaCentro').value;
    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Login realizado! Agora pode criar seu centro.");
            document.getElementById('criarCentroForm').style.display = 'block';
        })
        .catch(err => alert(err.message));
}

window.registrarCentro = function(){
    const email = document.getElementById('emailCentro').value;
    const senha = document.getElementById('senhaCentro').value;
    createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Cadastro realizado! Agora faça login.");
        })
        .catch(err => alert(err.message));
}

window.criarCentro = function(){
    const nome = document.getElementById('nomeCentro').value;
    if(nome === '') { alert("Digite o nome do centro."); return; }
    alert(`Centro ${nome} criado! Lembre-se: 25 MZN por aluno.`);
}

// ======================
// Gerador de CV (local, futuramente com IA)
// ======================
window.gerarCV = function(){
    const nome = document.getElementById('nomeCV').value;
    const objetivo = document.getElementById('objetivoCV').value;
    if(!nome || !objetivo){ alert("Preencha todos os campos."); return; }
    const resultado = `Nome: ${nome}\nObjetivo: ${objetivo}\n\n[CV gerado pela Vagalume AI]`;
    document.getElementById('resultadoCV').textContent = resultado;
}
