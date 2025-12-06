// app.js (module)
import { saveEnrollmentToFirestore } from './auth.js';

// toggle nav (exposed to inline onclick)
window.toggleNav = function() {
  const nav = document.getElementById('nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
};

// abrir inscricao (preenche query e redireciona para inscricao.html)
window.openInscricao = function(curso, wa, preco) {
  const params = new URLSearchParams({ curso, wa, preco });
  window.location.href = `inscricao.html?${params.toString()}`;
};

// compartilhar curso
window.shareCourse = function(title) {
  const url = location.origin + location.pathname + '#cursos';
  if (navigator.share) {
    navigator.share({ title, text: `Veja o curso ${title} na InfoLearn`, url });
  } else {
    navigator.clipboard.writeText(url);
    alert('Link copiado: ' + url);
  }
};

// message about fee 175 per student
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer p');
  if (footer) {
    const feeNotice = document.createElement('div');
    feeNotice.style.marginTop = '8px';
    feeNotice.style.color = '#fbbf24';
    feeNotice.style.fontWeight = '600';
    feeNotice.textContent = 'Nota: Quando o centro tiver muitos alunos será cobrada uma taxa de 175 MZN por cada aluno.';
    footer.parentNode.insertBefore(feeNotice, footer.nextSibling);
  }
});

// register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker registrado');
    }).catch(console.error);
  });
}