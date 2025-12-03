// Remove splash e mostra conteúdo
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