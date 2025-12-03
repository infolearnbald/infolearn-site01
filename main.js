// main.js
document.addEventListener('DOMContentLoaded', ()=> {
  const splash = document.getElementById('splash');
  const main = document.getElementById('mainContent');
  setTimeout(()=>{
    if(splash){
      splash.style.opacity='0';
      setTimeout(()=>{ if(splash.parentNode) splash.parentNode.removeChild(splash); },300);
    }
    if(main) main.style.display='block';
    // tenta chamar renderCourses (courses.js exporta e auto-run)
    try { if(typeof renderCourses === 'function') renderCourses(); } catch(e){}
    document.getElementById('year').innerText = new Date().getFullYear();
  },900);
});