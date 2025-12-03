import { auth } from "./firebaseConfig.js";

const cvForm = document.getElementById("cvForm");
const cvResult = document.getElementById("cvResult");
const cvOrganized = document.getElementById("cvOrganized");
const downloadPDFBtn = document.getElementById("downloadPDF");

cvForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!auth.currentUser) return alert("Faça login para usar o Vagalume IA.");

  cvResult.innerHTML = "Analisando...";

  const formData = new FormData(cvForm);
  try {
    const analyzeRes = await fetch("https://us-central1-infolearn-academy01.cloudfunctions.net/analyzeCV", {
      method: "POST",
      body: formData
    });
    const analyzeJson = await analyzeRes.json();
    cvResult.innerHTML = "<pre>" + analyzeJson.result + "</pre>";

    const organizeRes = await fetch("https://us-central1-infolearn-academy01.cloudfunctions.net/organizeCV", {
      method: "POST",
      body: formData
    });
    const organizeJson = await organizeRes.json();
    cvOrganized.innerHTML = organizeJson.htmlCV;

    downloadPDFBtn.style.display = "inline";
    downloadPDFBtn.onclick = () => {
      const blob = new Blob([organizeJson.htmlCV], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "CV-Organizado.pdf";
      link.click();
    };
  } catch (err) { alert(err); }
});