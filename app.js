// app.js (module)
export function toggleNav() {
  const nav = document.getElementById('nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// When running as <script type="module" src="app.js"> the exported toggleNav won't be global.
// For convenience (index uses onclick="toggleNav()") expose globally:
window.toggleNav = toggleNav;

// handle all course forms
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.inscricao-form');
  forms.forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const wa = f.dataset.wa; // e.g. "25886711103"
      const nome = f.querySelector('input[name="nome"]').value;
      const nivel = f.querySelector('select[name="nivel"]').value;
      const meses = f.querySelector('select[name="meses"]').value;
      const curso = f.closest('.curso-card').querySelector('h3').innerText;
      const precoText = f.closest('.curso-card').querySelector('.curso-preco').innerText;

      const mensagem = `Olá! Quero inscrever-me no curso *${curso}*.\nNome: ${nome}\nNível: ${nivel}\nPlano: ${meses}\n${precoText}`;
      // open WhatsApp link
      const url = `https://wa.me/${wa}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
    });
  });
});