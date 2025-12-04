document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('vagalume-form');
  const downloadBtn = document.getElementById('cv-download');

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const nome = form.nome.value;
    const profissao = form.profissao.value;
    const email = form.email.value;

    // Cria CV simples PDF
    const pdfContent = `
      Nome: ${nome}\nProfissão: ${profissao}\nEmail: ${email}
    `;
    const blob = new Blob([pdfContent], {type:"application/pdf"});
    const url = URL.createObjectURL(blob);
    downloadBtn.href = url;
    downloadBtn.style.display = "inline-block";
    alert("CV gerado! Clique no botão para download.");
  });
});