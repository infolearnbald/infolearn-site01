// Pesquisa de cursos
document.getElementById('searchBtn').addEventListener('click', function(){
  const termo = document.getElementById('searchInput').value.toLowerCase();
  const cursos = document.querySelectorAll('.curso-card');
  cursos.forEach(curso => {
    const titulo = curso.querySelector('h3').textContent.toLowerCase();
    curso.style.display = titulo.includes(termo) ? 'block' : 'none';
  });
});

// Envio de formulário para WhatsApp
document.querySelectorAll('.form-whatsapp').forEach(form=>{
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const phone = form.dataset.phone;
    let msg = `Nova matrícula:%0A`;
    Array.from(form.elements).forEach(input=>{
      if(input.name) msg += `${input.name}: ${input.value}%0A`;
    });
    const url = `https://wa.me/${phone}?text=${msg}`;
    window.open(url, '_blank');
    form.reset();
  });
});
