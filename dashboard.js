const firebaseConfig = {
  apiKey: "<SUA_API_KEY>",
  authDomain: "<SEU_AUTH_DOMAIN>",
  projectId: "<SEU_PROJECT_ID>",
  storageBucket: "<SEU_STORAGE_BUCKET>",
  messagingSenderId: "<SEU_SENDER_ID>",
  appId: "<SEU_APP_ID>"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Logout
function logout() {
  auth.signOut();
  window.location.href = 'index.html';
}

// Criar centro
function criarCentro() {
  const nome = prompt("Nome do Centro de Formação:");
  if (!nome) return;
  const user = auth.currentUser;
  db.collection('centrosFormacao').add({
    ownerUid: user.uid,
    nomeCentro: nome,
    criadoEm: new Date()
  }).then(() => alert("Centro criado!"));
}

// Gerar IA
async function gerarResumo() {
  const nome = document.getElementById("nome").value;
  const objetivo = document.getElementById("objetivo").value;

  const resp = await fetch("/api/vagalume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, objetivo })
  });

  const data = await resp.json();
  document.getElementById("resultado").textContent = data.texto || data.erro;
}
