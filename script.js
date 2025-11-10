// Registro do Service Worker (para PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(err => {
    console.warn('SW registration falhou:', err);
  });
}

// Função utilitária: obter e atualizar contadores em localStorage
function getCounter(id) {
  const val = localStorage.getItem('counter_' + id);
  return val ? parseInt(val, 10) : 0;
}
function incrementCounter(id) {
  const curr = getCounter(id) + 1;
  localStorage.setItem('counter_' + id, curr);
  return curr;
}
function updateAllCountersOnPage() {
  document.querySelectorAll('.counter').forEach(span => {
    const id = span.getAttribute('data-id');
    span.textContent = getCounter(id);
  });
}

// Inicializa contadores quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  updateAllCountersOnPage();

  // Pesquisa: enter ou clique
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  function doSearch() {
    const termo = searchInput.value.trim().toLowerCase();
    const cursos = document.querySelectorAll('.curso-card');
    cursos.forEach(curso => {
      const titulo = curso.querySelector('h3').textContent.toLowerCase();
      const descricao = (curso.querySelector('p') && curso.querySelector('p').textContent.toLowerCase()) || '';
      const match = titulo.includes(termo) || descricao.includes(termo);
      curso.style.display = (termo === '' || match) ? 'block' : 'none';
    });
  }
  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keyup', function(e){
    if (e.key === 'Enter') doSearch();
    else doSearch(); // filtro em tempo real
  });

  // Tratamento de todos os formulários
  document.querySelectorAll('.form-whatsapp').forEach(form => {
    form.addEventListener('submit', function(e){
      e.preventDefault();

      // Recolher dados do form
      const phone = form.dataset.phone || '258844180213';
      const courseName = form.dataset.course || form.querySelector('input[name="curso"]')?.value || 'Curso';

      let msg = `Nova matrícula - ${courseName}:%0A`;
      Array.from(form.elements).forEach(input => {
        if (input.name && input.type !== 'submit' && input.type !== 'button') {
          // escape valores e construir mensagem
          const nomeCampo = input.name;
          const valor = encodeURIComponent(input.value || '');
          msg += `${nomeCampo}: ${valor}%0A`;
        }
      });

      // Informação adicional sobre valores / instruções de pagamento
      msg += `%0AMensagem automática: Pagamento via M-Pesa ou e-mola. Receberemos confirmação do pagamento.%0A`;

      // Abrir WhatsApp (nova janela)
      const waUrl = `https://wa.me/${phone}?text=${msg}`;
      window.open(waUrl, '_blank');

      // Incrementar contador (usar course id data-attribute do cartão mais próximo)
      // Tenta localizar course-id pelo elemento pai mais próximo
      let cursoId = null;
      const card = form.closest('.curso-card');
      if (card) cursoId = card.getAttribute('data-course-id') || (form.querySelector('input[name="curso"]')?.value || '').toLowerCase().replace(/\s+/g,'');
      else cursoId = (courseName || 'curso').toLowerCase().replace(/\s+/g,'');

      const newVal = incrementCounter(cursoId);
      // Atualiza no DOM
      const span = document.querySelector(`.counter[data-id="${cursoId}"]`);
      if (span) span.textContent = newVal;

      // Reset do formulário
      form.reset();
      // Feedback visual breve
      alert('Formulário enviado! Abrimos o WhatsApp para finalizar. Obrigado pelo seu interesse.');
    });
  });
});
