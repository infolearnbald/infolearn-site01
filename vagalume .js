// vagalume.js
import { storage, db, auth } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', ()=>{
  const txtArea = document.getElementById('vagalumeText');
  const fileIn = document.getElementById('vagalumeFile');
  const imgIn = document.getElementById('vagalumeImage');
  const analyzeBtn = document.getElementById('vagalumeAnalyze');
  const genBtn = document.getElementById('vagalumeGenerate');
  const result = document.getElementById('vagalumeResult');

  let uploadedImageUrl = null;

  imgIn?.addEventListener('change', async (e)=>{
    const f = e.target.files[0];
    if(!f) return;
    const storageRef = ref(storage, `vagalume_images/${Date.now()}_${f.name}`);
    await uploadBytes(storageRef, f);
    uploadedImageUrl = await getDownloadURL(storageRef);
    document.getElementById('vPreview') && (document.getElementById('vPreview').innerHTML = `<img src="${uploadedImageUrl}" style="max-width:120px;border-radius:8px">`);
    alert('Imagem enviada e associada à análise.');
  });

  fileIn?.addEventListener('change', async (e)=>{
    const f = e.target.files[0];
    if(!f) return;
    if(f.type === 'text/plain' || f.name.endsWith('.txt')){
      const txt = await f.text();
      txtArea.value = txt;
    } else {
      alert('Apenas ficheiros .txt suportados aqui. PDFs/DOCX requerem bibliotecas adicionais.');
    }
  });

  function analyzeText(text){
    const lines = text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const info = { name:'', email:'', phone:'', about:[], experience:[], skills:[] };
    lines.forEach(line=>{
      if(!info.email && /\S+@\S+\.\S+/.test(line)) info.email = line.match(/\S+@\S+\.\S+/)[0];
      else if(!info.phone && /(\+?\d{8,})/.test(line)) info.phone = line.match(/(\+?\d{8,})/)[0];
      else if(line.toLowerCase().includes('experiência') || line.toLowerCase().includes('experience')) info.experience.push(line);
      else if(line.toLowerCase().includes('habilidades') || line.toLowerCase().includes('skills')) info.skills.push(line);
      else info.about.push(line);
    });
    return info;
  }

  analyzeBtn?.addEventListener('click', ()=>{
    const text = txtArea.value.trim();
    if(!text){ alert('Cole ou carregue o currículo em texto.'); return; }
    const parsed = analyzeText(text);
    result.innerHTML = `<pre style="white-space:pre-wrap">${JSON.stringify(parsed, null, 2)}</pre>`;
    document.getElementById('analysis')?.style && (document.getElementById('analysis').style.display='block');
    window.lastParsedCV = parsed;
  });

  genBtn?.addEventListener('click', async ()=>{
    const parsed = window.lastParsedCV;
    const text = txtArea.value.trim();
    if(!text && !parsed){ alert('Sem conteúdo para gerar.'); return; }

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const title = parsed?.name || 'CV InfoLearn';
      doc.setFontSize(16);
      doc.text(title, 14, 20);
      doc.setFontSize(12);
      let y = 30;
      const lines = (text || JSON.stringify(parsed, null, 2)).split('\n');
      lines.forEach((ln)=>{
        if(y > 280){ doc.addPage(); y = 20; }
        doc.text(ln.substring(0, 120), 14, y);
        y += 8;
      });
      if(uploadedImageUrl){
        try{
          // include image (cross-origin might block remote URLs), best effort
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = function(){
            doc.addImage(img, 'JPEG', 140, 10, 50, 50);
            doc.save('CV-InfoLearn.pdf');
          };
          img.src = uploadedImageUrl;
        } catch(e){
          doc.save('CV-InfoLearn.pdf');
        }
      } else {
        doc.save('CV-InfoLearn.pdf');
      }

      // Save analysis record to Firestore (optional) with uid if logged
      onAuthStateChanged(auth, async (user)=>{
        try {
          await addDoc(collection(db, 'cv_analyses'), {
            uid: user ? user.uid : null,
            parsed: parsed || null,
            textSnippet: (text || '').slice(0,1000),
            image: uploadedImageUrl || null,
            createdAt: serverTimestamp()
          });
        } catch(e){}
      });
    } catch(e){
      alert('Erro ao gerar PDF. Verifique se o jsPDF está carregado.');
    }
  });

});
