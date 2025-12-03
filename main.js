document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("mainContent");

  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.remove();
      main.style.display = "block";
    }, 300);
  }, 1000);
});

window.openCourse = function (id) {
  window.location.href = "course_" + id + ".html";
};

window.buyCourse = function (id) {
  alert("Pagamento será integrado. Curso: " + id);
};