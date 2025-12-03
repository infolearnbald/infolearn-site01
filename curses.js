// courses.js
import { db, auth } from './firebase.js';
import { collection, getDocs, addDoc, serverTimestamp, query, where, getCountFromServer } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

/**
 * WhatsApp numbers mapping (user provided)
 * english -> 874094875
 * music -> 857521281
 * design -> 867101103
 * other paid courses -> 844180213
 * macro-study -> DO NOT CHANGE (uses existing page)
 */
const WA = {
  english: '258874094875',
  music: '258857521281',
  design: '258867101103',
  default: '258844180213'
};

const seedCourses = async () => {
  const snap = await getDocs(collection(db, 'courses'));
  if(!snap.empty) return; // already seeded
  // seed array
  const data = [
    { title: 'Inglês Corporativo', type: 'paid', priceMonth: 1200, price3m: 3600, thumbnail:'ingles.jpg', description: 'Inglês para negócios e comunicação profissional.' },
    { title: 'Design Gráfico (Photoshop/Illustrator)', type: 'paid', priceMonth: 2500, price3m: 7500, thumbnail:'design.jpg', description: 'Escolha Photoshop ou Illustrator. Curso prático.' },
    { title: 'Música', type: 'paid', priceMonth: 1600, price3m: null, thumbnail:'musica.jpg', description: 'Curso de música - produção e teoria.' },
    { title: 'Marketing Digital', type: 'paid', priceMonth: 1200, price3m: 3600, thumbnail:'marketing.jpg', description: 'Marketing digital prático.' },
    { title: 'Programação (Introdução)', type: 'paid', priceMonth: 1200, price3m: 3600, thumbnail:'programacao.jpg', description: 'Fundamentos de programação.' },
    { title: 'Curso Gratuito: Introdução ao Office', type: 'free', thumbnail:'office.jpg', description: 'Curso básico de Office - gratuito.' },
    { title: 'Curso Gratuito: Noções de Segurança Online', type: 'free', thumbnail:'security.jpg', description: 'Dicas e boas práticas de cibersegurança.' }
  ];

  for(const c of data){
    await addDoc(collection(db, 'courses'), {...c, createdAt: serverTimestamp()});
  }
};

export async function renderCourses(){
  await seedCourses();
  const freeContainer = document.getElementById('freeCourses');
  const paidContainer = document.getElementById('paidCourses');
  if(!freeContainer && !paidContainer) return;

  const snap = await getDocs(collection(db, 'courses'));
  freeContainer && (freeContainer.innerHTML = '');
  paidContainer && (paidContainer.innerHTML = '');

  snap.forEach(docu=>{
    const data = docu.data();
    const id = docu.id;
    const card = document.createElement('div');
    card.className = 'curso-card';
    card.innerHTML = `
      ${data.thumbnail ? `<img src="${data.thumbnail}" alt="${data.title}">` : ''}
      <h3>${data.title}</h3>
      <div class="muted">${data.description || ''}</div>
      ${data.type === 'paid' ? `<p><strong>Preço:</strong> ${data.priceMonth ? data.priceMonth+' MT/mês' : ''} ${data.price3m ? '| 3 meses: '+data.price3m+' MT' : ''}</p>` : ''}
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn view-btn" data-id="${id}">Ver</button>
        ${data.type === 'paid' ? `<button class="btn secondary enroll-btn" data-id="${id}" data-title="${data.title}" data-slug="${(data.title||'').toLowerCase().replace(/\s+/g,'-')}">Inscrever</button>` : `<button class="btn secondary enroll-free-btn" data-id="${id}" data-title="${data.title}">Acessar</button>`}
      </div>
    `;

    if(data.type === 'paid'){
      paidContainer && paidContainer.appendChild(card);
    } else {
      freeContainer && freeContainer.appendChild(card);
    }
  });

  // Events
  document.querySelectorAll('.enroll-btn').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const courseId = e.currentTarget.dataset.id;
      const title = e.currentTarget.dataset.title;
      const slug = e.currentTarget.dataset.slug || '';
      // Determine WA number based on title slug
      let wa = WA.default;
      if(slug.includes('ingl') || title.toLowerCase().includes('ingl')) wa = WA.english;
      else if(slug.includes('mus') || title.toLowerCase().includes('música') || title.toLowerCase().includes('musica')) wa = WA.music;
      else if(slug.includes('design') || title.toLowerCase().includes('design')) wa = WA.design;
      // if logged, save enrolment
      onAuthStateChanged(auth, async (user)=>{
        if(!user){
          // redirect to inscription form with course param
          window.location.href = `inscricao.html?curso=${encodeURIComponent(title)}&wa=${wa}`;
          return;
        }
        // save enrolment with uid
        try {
          await addDoc(collection(db, 'enrolments'), {
            uid: user.uid,
            courseId,
            courseTitle: title,
            createdAt: serverTimestamp(),
            status: 'pending'
          });
        } catch(e){}
        // open WhatsApp
        const msg = `Olá, quero me inscrever no curso ${title}. UID: ${user.uid}`;
        window.open(`https://wa.me/${wa.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
      });
    });
  });

  document.querySelectorAll('.enroll-free-btn').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const courseId = e.currentTarget.dataset.id;
      const title = e.currentTarget.dataset.title;
      onAuthStateChanged(auth, async (user)=>{
        if(!user){ alert('Por favor, inicie sessão para acessar este curso gratuito.'); window.location.href = 'login.html'; return; }
        try {
          await addDoc(collection(db, 'enrolments'), {
            uid: user.uid,
            courseId,
            courseTitle: title,
            createdAt: serverTimestamp(),
            status: 'active'
          });
          alert('Inscrição gratuita efetuada! Veja no seu perfil.');
        } catch(err){ alert('Erro: '+err.message); }
      });
    });
  });

  document.querySelectorAll('.view-btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      const id = e.currentTarget.dataset.id;
      window.location.href = `course.html?id=${id}`;
    });
  });
}

// auto-run if on index
try{ renderCourses(); }catch(e){}
