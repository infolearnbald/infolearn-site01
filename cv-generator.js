document.getElementById('cvForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('cvName').value;
  const phone = document.getElementById('cvPhone').value;
  const email = document.getElementById('cvEmail').value;
  const skills = document.getElementById('cvSkills').value;

  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text('Currículo', 105, 20, null, null, 'center');
  doc.setFontSize(16);
  doc.text(`Nome: ${name}`, 20, 40);
  doc.text(`Telefone: ${phone}`, 20, 50);
  doc.text(`Email: ${email}`, 20, 60);
  doc.text(`Habilidades: ${skills}`, 20, 70);

  doc.save(`CV-${name.replace(/\s+/g,'_')}.pdf`);
});

