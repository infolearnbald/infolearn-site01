// vagalume.js - análise simples + geração PDF automatizada
import { storage, db } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const imgInput = document.getElementById('vImg');
const fileInput = document.getElementById('cvFile');
const txtArea = document.getElementById('cvText');
const analyzeBtn = document.getElementById('analyze');
const downloadBtn = document.getElementById('download');
const personalBtn = document.getElementById('personal');
const vPreview = document.getElementById('vPreview');
const analysis = document.getElementById('analysis');
const analysisContent = document.getElementById('analysisContent');
let uploadedImgUrl = null;
let lastParsed = null;

// upload image (optional)
imgInput?.addEventListener('change', async e=>{
  const f = e.target.files[0];
  if(!f) return;
  const r = ref(storage, `vagalume_images/${Date.now()}_${f.name}`);
  await uploadBytes(r, f);
  uploadedImgUrl = await getDownloadURL(r);
  vPreview.innerHTML = `<img src="${uploadedImgUrl}" style="max-width:140px;border-radius:8px">`;
});

// load txt file
fileInput?.addEventListener('change', async e=>{
  const f = e.target.files[0];
  if(!f) return;
  if(f.type==='text/plain' || f.name.endsWith('.txt')) {
    const txt = await f.text(); txtArea.value = txt;
  } else alert('Apenas ficheiros .txt ou texto');
});

// parse heuristics
function analyzeText(text){
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const info={name:'', email:'', phone:'', summary:[], experience:[], skills:[]};
  for(const line of lines){
    if(!info.email && /\S+@\S+\.\S+/.test(line)) info.email=line.match(/\S+@\S+\.\S+/)[0];
    else if(!info.phone && /(\+?\d{8,12})/.test(line)) info.phone=line.match(/(\+?\d{8,12})/)[0];
    else if(/experienc|experiência/i.test(line)) info.experience.push(line);
    else if(/skill|habilid/i.test(line)) info.skills.push(line);
    else if(!info.name && /^[A-Z][a-z]+\s[A-Z]/.test(line)) info.name=line;
    else info.summary.push(line);
  }
  return info;
}

analyzeBtn?.addEventListener('click', ()=>{
  const text = txtArea.value.trim();
  if(!text) return alert('Cole o CV ou carregue um .txt');
  lastParsed = analyzeText(text);
  analysis.style.display='block';
  analysisContent.innerHTML = `<pre style="white-space:pre-wrap">${JSON.stringify(lastParsed,null,2)}</pre>`;
});

// generate PDF automatic using jsPDF
downloadBtn?.addEventListener('click', async ()=>{
  const js = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
  const { jsPDF } = js;
  const doc = new jsPDF();
  const title = lastParsed?.name||'CV InfoLearn';
  doc.setFontSize(16); doc.text(title,14,16);
  doc.setFontSize(11);
  let y=26;
  const addLine = (t)=>{ const lines=doc.splitTextToSize(t,180); doc.text(lines,14,y); y+=lines.length*6; if(y>270){ doc.addPage(); y=14; } };
  if(lastParsed?.email) addLine('Email: '+lastParsed.email);
  if(lastParsed?.phone) addLine('Telefone: '+lastParsed.phone);
  if(lastParsed?.summary?.length) addLine('Resumo: '+ lastParsed.summary.join(' '));
  if(lastParsed?.skills?.length) addLine('Habilidades: '+ lastParsed.skills.join(' | '));
  if(lastParsed?.experience?.length) addLine('Experiência: '+ lastParsed.experience.join('\n'));
  if(uploadedImgUrl){
    try{
      const img = new Image(); img.crossOrigin='anonymous';
      img.onload = ()=>{ doc.addImage(img,'PNG',140,10,50,50); doc.save(`CV-${title.replace(/\s+/g,'_')}.pdf`); };
      img.src = uploadedImgUrl;
      // if image loads async, ensure db save too
    }catch(e){ doc.save(`CV-${title.replace(/\s+/g,'_')}.pdf`); }
  } else doc.save(`CV-${title.replace(/\s+/g,'_')}.pdf`);

  // save analysis to Firestore (optional)
  try{ await addDoc(collection(db,'cv_generated'), { parsed:lastParsed, createdAt:serverTimestamp(), image: uploadedImgUrl||null }); }catch(err){}
});

// personalized -> open whatsapp
personalBtn?.addEventListener('click', ()=>{
  const name = lastParsed?.name || prompt('Nome completo:') || '';
  const email = lastParsed?.email || prompt('Email:') || '';
  const phone = lastParsed?.phone || prompt('Telefone:') || '';
  const msg = `Olá, desejo um CV personalizado (75 MT). Nome: ${name}. Email: ${email}. Telefone: ${phone}.`;
  window.open(`https://wa.me/258844180213?text=${encodeURIComponent(msg)}`, '_blank');
});
