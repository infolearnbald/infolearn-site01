import { auth, db } from "./firebaseConfig.js";
import { getDocs, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const panelContainer = document.getElementById("panelContainer");

export async function loadStudentPanel() {
  if (!auth.currentUser) {
    panelContainer.innerHTML = "<p>Faça login para ver seus cursos.</p>";
    return;
  }

  const userId = auth.currentUser.uid;
  const coursesSnap = await getDocs(collection(db, "users", userId, "courses"));
  let html = "<h3>Seus cursos inscritos:</h3><ul>";

  coursesSnap.forEach(courseDoc => {
    html += `<li>${courseDoc.id}</li>`;
  });

  html += "</ul>";
  panelContainer.innerHTML = html;
}

