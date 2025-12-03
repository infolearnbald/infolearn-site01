// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    const l = document.getElementById("loader");
    if (l) l.classList.add("hidden");
  }, 700);
});

// Ano automático
document.getElementById("year").innerText = new Date().getFullYear();