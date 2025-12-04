// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração
const firebaseConfig = {
  apiKey: "AIzaSyDWM3VAjFNtM4l_UaEg2r0e04sFVJMXudw",
  authDomain: "infolearn-academy-89bee.firebaseapp.com",
  projectId: "infolearn-academy-89bee",
  storageBucket: "infolearn-academy-89bee.appspot.com",
  messagingSenderId: "65886712812",
  appId: "1:65886712812:web:0fc810717e1f31b83b86c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Formulário cursos gratuitos
document.querySelectorAll('.form-firebase').forEach(form=>{
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const nome = form.nome.value;
    const email = form.email.value;
    const telefone = form.telefone.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, "InfoLearn123!");
      await addDoc(collection(db,"usuarios"),{nome,email,telefone});
      alert("Cadastro concluído! Agora pode acessar os cursos gratuitos.");
      form.reset();
    } catch(err) {
      alert(err.message);
    }
  });
});