// courses.js
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp, increment, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const freeCourses = [
  {
    id: 'pixel-mob',
    title: 'Design Mobile — PixelLab',
    desc: 'Design mobile com PixelLab. Vídeos + 3 PDFs + testes.',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_PIXEL', // substitua VIDEO_ID_PIXEL
    pdfs: ['pixel-aula1.pdf','pixel-aula2.pdf','pixel-aula3.pdf']
  },
  {
    id: 'marketing-digital',
    title: 'Marketing Digital',
    desc: 'Introdução ao marketing digital. Vídeos + PDFs + exercícios.',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_MARKETING', // substituir
    pdfs: ['marketing-a1.pdf','marketing-a2.pdf','marketing-a3.pdf']
  }
];

const paidCourses = [
  {
    id:'design-pro',
    title:'Design Gráfico Profissional',
    options:['Photoshop','Illustrator']
  },
  {
    id:'criacao-musica',
    title:'Criação Musical',
    options:['FL Studio','Samplitude']
  },
  {
    id:'ingles',
    title:'Inglês (Básico / Médio / Avançado)',
    options:['Básico','Médio','Avançado']
  }
];

function createCard(course, isFree=true){
  const div = document.createElement('div');
  div.className = 'curso-card';
  div.innerHTML = `
    <img src="${course.id}.jpg" alt="${course.title}" onerror="this.src='curso-default.jpg'">
    <h3>${course.title}</h3>
    <p>${course.desc || ''}</p>
  `;
  if(isFree){
    const btnView = document.createElement('a');
    btnView.className='btn';
    btnView.href = course.youtube;
    btnView.target = '_blank';
    btnView.textContent = 'Ver Aulas (YouTube)';
    div.appendChild(btnView);

    const enrollBtn = document.createElement('button');
    enrollBtn.className='btn secondary';
    enrollBtn.textContent = 'Inscrever-se (Gratuito)';
    enrollBtn.onclick = ()=> enrollFree(course);
    div.appendChild(enrollBtn);
  } else {
    // paid: add options select and whatsapp form
    const select = document.createElement('select');
    select.className='select-option';
    select.innerHTML = `<option value="">Escolha uma opção</option>` + course.options.map(o=>`<option>${o}</option>`).join('');
    div.appendChild(select);

    const durSelect = document.createElement('select');
    durSelect.className='select-duration';
    durSelect.innerHTML = `<option value="">Duração</option><option>1 mês</option><option>3 meses</option>`;
    div.appendChild(durSelect);

    const formName = document.createElement('input'); formName.placeholder='Seu nome';
    const formEmail = document.createElement('input'); formEmail.placeholder='Seu email';
    const formPhone = document.createElement('input'); formPhone.placeholder='WhatsApp (ex: 2588...)';
    formName.className=formEmail.className=formPhone.className='form-field';
    div.appendChild(formName); div.appendChild(formEmail); div.appendChild(formPhone);

    const payBtn = document.createElement('button');
    payBtn.className='btn';
    payBtn.textContent='Inscrever (Pago)';
    payBtn.onclick = ()=>{
      if(!formName.value || !formEmail.value || !formPhone.value || !select.value || !durSelect.value){
        alert('Preencha todos os campos e escolha opção/duração.');
        return;
      }
      // montar mensagem e abrir WhatsApp
      const msg = `Olá, quero inscrever-me no curso ${course.title} - Opção: ${select.value} - Duração: ${durSelect.value}.\nNome: ${formName.value}\nEmail: ${formEmail.value}\nWhatsApp: ${formPhone.value}`;
      const phone = '258844180213';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };
    div.appendChild(payBtn);
  }
  return div;
}

async function enrollFree(course){
  // salva na colecção 'inscricoes' e incrementa contador em 'cursos_stats'
  try {
    await addDoc(collection(db,'inscricoes'), {
      courseId: course.id,
      courseTitle: course.title,
      createdAt: serverTimestamp()
    });
    // increment contador (cria doc se necessário)
    const statRef = doc(db,'cursos_stats',course.id);
    try {
      await updateDoc(statRef, { inscritos: increment(1) });
    } catch(e){
      // se não existe, cria
      await addDoc(collection(db,'cursos_stats'), { _id: course.id, inscritos: 1 });
    }
    alert('Inscrição gratuita registada. Pode ver as aulas no YouTube.');
  } catch(err){
    alert('Erro ao inscrever: '+err.message);
  }
}

export function renderCourses(){
  const freeRoot = document.getElementById('freeCourses');
  const paidRoot = document.getElementById('paidCourses');
  if(freeRoot){
    freeRoot.innerHTML='';
    freeCourses.forEach(c=>{
      const card = createCard(c,true);
      freeRoot.appendChild(card);
    });
  }
  if(paidRoot){
    paidRoot.innerHTML='';
    paidCourses.forEach(c=>{
      const card = createCard(c,false);
      paidRoot.appendChild(card);
    });
  }
}

// auto-run if included as module
renderCourses();