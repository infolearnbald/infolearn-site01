// main.js — controla splash, mostra conteúdo e tenta inicializar módulos opcionais

(function () {
  // segurança: evita erros se DOM ainda não pronto
  function onReady(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(() => {
    const splash = document.getElementById('splash') || document.getElementById('loader');
    const main = document.getElementById('mainContent') || document.querySelector('main') || document.body;

    function finishSplash() {
      try {
        if (splash) {
          // remove com suavidade e garante que não bloqueia eventos
          splash.style.transition = 'opacity 300ms ease';
          splash.style.opacity = '0';
          splash.style.pointerEvents = 'none';
          setTimeout(() => {
            if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
          }, 350);
        }

        // mostra mainContent (se estiver escondido)
        if (main) {
          // se mainContent é o wrapper que inicialmente estava oculto
          if (document.getElementById('mainContent')) {
            document.getElementById('mainContent').style.display = 'block';
          } else {
            // garante que <main> esteja visível
            const mainEl = document.querySelector('main');
            if (mainEl) mainEl.style.display = '';
          }
        }

        // Tenta chamar funções de inicialização opcionais sem quebrar
        if (typeof renderFeatured === 'function') {
          try { renderFeatured(); console.log('renderFeatured() executado'); } catch (e) { console.warn('renderFeatured falhou:', e); }
        }

        if (typeof initVagalume === 'function') {
          try { initVagalume(); console.log('initVagalume() executado'); } catch (e) { console.warn('initVagalume falhou:', e); }
        }

        if (typeof authStateChanged === 'function') {
          try { authStateChanged(); console.log('authStateChanged() executado'); } catch (e) { console.warn('authStateChanged falhou:', e); }
        }

      } catch (err) {
        console.error('Erro em finishSplash:', err);
        // garante que nada fica bloqueado
        if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
        if (document.getElementById('mainContent')) document.getElementById('mainContent').style.display = 'block';
      }
    }

    // 1) se houver animação CSS, espera por animationend/transitionend
    if (splash) {
      let waited = false;
      const onAnimEnd = (ev) => {
        if (waited) return;
        waited = true;
        splash.removeEventListener('animationend', onAnimEnd);
        splash.removeEventListener('transitionend', onAnimEnd);
        finishSplash();
      };
      splash.addEventListener('animationend', onAnimEnd);
      splash.addEventListener('transitionend', onAnimEnd);

      // fallback: depois de X ms força remover (caso a animação não dispare)
      setTimeout(() => {
        if (!waited) { waited = true; finishSplash(); }
      }, 2200); // tempo seguro: 2.2s
    } else {
      // sem splash — mostra direto
      finishSplash();
    }
  });
})();// Remove splash e mostra conteúdo
window.onload = () => {
  setTimeout(() => {
    document.getElementById("mainContent").style.display = "block";
  }, 2000);
};

// Navegação
function navigateTo(page) {
  window.location.href = page;
}

// Contatos (adicione seus links reais aqui)
document.getElementById("facebookLink").href = "https://facebook.com/SEU_LINK";
document.getElementById("instagramLink").href = "https://instagram.com/SEU_LINK";
document.getElementById("youtubeLink").href = "https://youtube.com/SEU_LINK";
document.getElementById("linkedinLink").href = "https://linkedin.com/in/SEU_LINK";