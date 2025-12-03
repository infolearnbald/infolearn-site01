// Lista de cursos da plataforma
export const courses = [
  { id: "ingles", title: "Inglês Básico", type: "free", price: 0 },
  { id: "musica", title: "Música Básica", type: "free", price: 0 },
  { id: "informatica", title: "Informática Básica", type: "free", price: 0 },
  { id: "design", title: "Design Gráfico Mobile (Pixellab)", type: "free", price: 0 },
  { id: "cvpro", title: "Criação de CV Profissional", type: "paid", price: 75 },
  { id: "marketing", title: "Marketing Digital Avançado", type: "paid", price: 100 }
];

// Função para inscrever usuário em curso
import { db } from "./firebaseConfig.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { auth } from "./firebaseConfig.js";

export async function enrollCourse(courseId) {
  if (!auth.currentUser) return alert("Faça login para se inscrever.");
  const userId = auth.currentUser.uid;
  try {
    await setDoc(doc(db, "users", userId, "courses", courseId), { enrolled: true, date: new Date() });
    alert("Inscrição realizada com sucesso!");
  } catch (err) { alert(err.message); }
}