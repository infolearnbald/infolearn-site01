// Lógica de formulários WhatsApp
document.querySelectorAll('.form-whatsapp').forEach(form => {
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const phone = form.dataset.phone;
    const course = form.dataset.course;
    const name = form.nome.value;
    const email = form.email.value;
    const idade = form.idade.value;
    const genero = form.genero.value;
    const provincia = form.provincia.value;
    const duracao = form.duracao ? form.duracao.value : '';

    const url = `https://wa.me/${phone}?text=Olá,%20quero%20me%20inscrever%20no%20curso%20${course}%20Nome:%20${name}%20Email:%20${email}%20Idade:%20${idade}%20Gênero:%20${genero}%20Província:%20${provincia}%20Duração:%20${duracao}`;
    window.open(url,'_blank');
  });
});
