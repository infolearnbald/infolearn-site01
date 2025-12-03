// courses.js
import { db, auth } from './firebase.js';
import { collection, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

/**
 * Função pública que main.js tenta chamar:
 */
export async function renderCourses(){
  const freeContainer = document.getElementById('freeCourses');
  const paidContainer = document.getElementById('paidCourses');
  if(!freeContainer && !paidContainer) return;

  const snap = await getDocs(collection(db, 'courses'));
  if(snap.empty){
    if(freeContainer) freeContainer.innerHTML = '<div class="muted">Sem cursos disponíveis.</div>';
    if(paidContainer) paidContainer.innerHTML = '<div class="muted">Sem cursos pagos disponíveis.</div>';
    return;
  }

  snap.forEach(docu=>{
    const data = docu.data();
    const id = docu.id;
    const card = document.createElement('div');
    card.className = 'curso-card';
    card.innerHTML = `
      ${data.thumbnail ? `<img src="${data.thumbnail}" alt="${data.title}">` : ''}
      <h3>${data.title}</h3>
      <div class="muted">${data.description || ''}</div>
      <p><strong>Tipo:</strong> ${data.type || 'free'}</p>
      ${data.type === 'paid' ? `<p><strong>Preço:</strong> ${data.price || 'Consulte'}</p>` : ''}
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn view-btn" data-id="${id}">Ver</button>
        ${data.type === 'paid' ? `<button class="btn secondary enroll-btn" data-id="${id}" data-title="${data.title}">Inscrever</button>` : `<button class="btn secondary enroll-free-btn" data-id="${id}">Acessar</button>`}
      </div>
    `;
    if(data.type === 'paid'){
      if(paidContainer) paidContainer.appendChild(card);
    } else {
      if(freeContainer) freeContainer.appendChild(card);
    }
  });

  // events
  document.querySelectorAll('.enroll-btn').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const courseId = e.currentTarget.dataset.id;
      const courseTitle = e.currentTarget.dataset.title || 'Curso';
      // save enrolment and then redirect to WhatsApp for payment confirmation
      onAuthStateChanged(auth, async (user)=>{
        if(!user){ alert('Por favor inicie sessão para se inscrever.'); window.location.href='login.html'; return; }
        // save enrolment
        await addDoc(collection(db, 'enrolments'), {
          uid: user.uid,
          courseId,
          courseTitle,
          createdAt: serverTimestamp(),
          status: 'pending'
        });
        // redirect to whatsapp (you must replace the number)
        const phone = '258844180213';
        const message = `Olá, quero me inscrever no curso ${courseTitle}. UID: ${user.uid}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      });
    });
  });

  document.querySelectorAll('.enroll-free-btn').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const courseId = e.currentTarget.dataset.id;
      onAuthStateChanged(auth, async (user)=>{
        if(!user){ alert('Por favor inicie sessão para acessar este curso.'); window.location.href='login.html'; return; }
        await addDoc(collection(db, 'enrolments'), {
          uid: user.uid,
          courseId,
          createdAt: serverTimestamp(),
          status: 'active'
        });
        alert('Inscrição gratuita efetuada! Veja no seu perfil.');
      });
    });
  });

  // view buttons could open a modal or page; keep simple:
  document.querySelectorAll('.view-btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      const id = e.currentTarget.dataset.id;
      window.location.href = `course.html?id=${id}`;
    });
  });
}

// auto-run when module imported (index main calls again but safe)
try{ renderCourses(); }catch(e){}
