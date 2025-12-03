/* ============================================================
   CONFIGURAR FIREBASE
   ============================================================ */

// 👉 Substitua pelos dados do SEU projeto Firebase:
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:00000000000000"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* ============================================================
   FUNÇÕES DE LOGIN, LOGOUT, CADASTRO
   ============================================================ */

// CADASTRAR NOVO USUÁRIO
async function registerUser() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Salvar nome no Firestore
    await db.collection("users").doc(user.uid).set({
      name: name,
      email: email,
      createdAt: new Date()
    });

    alert("Conta criada com sucesso!");
    window.location.href = "profile.html"; // área do usuário
  } catch (error) {
    alert(error.message);
  }
}

// LOGIN DO USUÁRIO
async function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Login efetuado!");

    window.location.href = "profile.html"; // ir para o perfil
  } catch (error) {
    alert("Erro: " + error.message);
  }
}

// LOGOUT
function logoutUser() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

/* ============================================================
   PROTEGER PÁGINAS INTERNAS (APENAS LOGADOS)
   ============================================================ */

function checkAuth() {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    // PUXAR DADOS DO USER
    const doc = await db.collection("users").doc(user.uid).get();
    if (doc.exists) {
      document.getElementById("userName").innerText = doc.data().name;
      document.getElementById("userEmail").innerText = doc.data().email;
    }
  });
}

/* ============================================================
   FORMULÁRIO DE INSCRIÇÃO DOS CURSOS PAGOS
   ENVIAR DADOS DIRETO PARA O WHATSAPP
   ============================================================ */

function sendCourseToWhatsapp(courseName) {
  const name = document.getElementById("curso-nome").value;
  const email = document.getElementById("curso-email").value;
  const phone = document.getElementById("curso-phone").value;

  if (!name || !email || !phone) {
    alert("Preencha todos os campos!");
    return;
  }

  const message =
    `Olá, quero me inscrever no curso *${courseName}*.\n` +
    `Meu nome: ${name}\n` +
    `Email: ${email}\n` +
    `Telefone: ${phone}`;

  const whatsappNumber = "+258XXXXXXXXX"; // coloque o número real
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* ============================================================
   DOWNLOAD DO CV PRONTO (COM NOME DO USUÁRIO)
   ============================================================ */

function generateCV() {
  const fullName = document.getElementById("cv-fullname").value;

  if (!fullName) {
    alert("Escreva o nome completo!");
    return;
  }

  const fileName = `CV-${fullName.replace(/\s+/g, "_")}.pdf`;
  alert("Seu CV será baixado como: " + fileName);

  // Aqui você futuramente pode integrar com jsPDF ou PDFKit
  // Agora só baixa como texto simples (para teste)
  const blob = new Blob([`CV de ${fullName}`], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

/* ============================================================
   BOTÃO DO MENU MOBILE (ABRIR E FECHAR)
   ============================================================ */

function toggleMenu() {
  const nav = document.getElementById("mobile-menu");
  nav.classList.toggle("open");
}