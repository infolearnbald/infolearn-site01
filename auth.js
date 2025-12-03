import { auth } from "./firebase.js";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    alert("Login feito!");
  } catch (err) {
    alert("Erro no Login: " + err.message);
  }
};

window.signUp = async function () {
  const email = document.getElementById("upEmail").value;
  const pass = document.getElementById("upPass").value;

  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    alert("Conta criada!");
  } catch (err) {
    alert("Erro no Sign Up: " + err.message);
  }
};