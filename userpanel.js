// Área do estudante (cursos gratuitos)
document.addEventListener('DOMContentLoaded', ()=>{
  const user = localStorage.getItem('user');
  if(!user){
    alert("Faça login primeiro!");
    window.location.href = "index.html";
  }
});