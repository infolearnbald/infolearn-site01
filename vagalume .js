// Vagalume IA — cria CV automaticamente em PDF
import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";

const container = document.getElementById('vagalume-container');

function gerarCV(nome, email, profissao) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Curriculum Vitae`, 20, 20);
  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 20, 40);
  doc.text(`Email: ${email}`, 20, 50);
  doc.text(`Profissão: ${profissao}`, 20, 60);
  doc.text(`Gerado automaticamente pela Vagalume IA`, 20, 80);
  
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${nome}_CV.pdf`;
  link.innerText = 'Download do seu CV';
  link.classList.add('btn');
  container.innerHTML = '';
  container.appendChild(link);
}

// Formulário automático
const nomes = ["João Silva","Maria Santos","Ropson Gustavo"];
nomes.forEach(nome => {
  gerarCV(nome, `${nome.toLowerCase().replace(' ','')}@infolearn.com`, "Estudante/Profissional");
});
