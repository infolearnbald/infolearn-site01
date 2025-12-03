// vagalume.js
// simples organizador + gera PDF (texto formatado) — sem IA remota
// se quiseres integrar IA real, dá-me a API (opcional).

// função para organizar texto do CV em seções básicas
function parseCV(text){
  // heurística simples: procura por palavras-chave
  const sections = {};
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  let current = 'Resumo';
  sections[current]=[];
  for(const line of lines){
    const low = line.toLowerCase();
    if(/experi|experience|experiência/.test(low)){ current='Experiência'; sections[current]=[]; continue; }
    if(/formação|educa|education|curso|escolaridade/.test(low)){ current='Formação'; sections[current]=[]; continue; }
    if(/habilid|skill|competênc|competencia/.test(low)){ current='Habilidades'; sections[current]=[]; continue; }
    if(/contato|telefone|email/.test(low)){ current='Contato'; sections[current]=[]; continue; }
    sections[current].push(line);
  }
  return sections;
}

function renderSections(sections){
  const root = document.getElementById('vagalumeResult');
  root.innerHTML='';
  for(const k of Object.keys(sections)){
    const h = document.createElement('h4'); h.textContent = k;
    const ul = document.createElement('ul');
    sections[k].forEach(s => {
      const li=document.createElement('li'); li.textContent=s; ul.appendChild(li);
    });
    root.appendChild(h); root.appendChild(ul);
  }
}

document.getElementById('vagalumeAnalyze')?.addEventListener('click', async ()=>{
  const txt = document.getElementById('vagalumeText').value.trim();
  if(!txt){
    alert('Cole o CV ou carregue um ficheiro.');
    return;
  }
  const sec = parseCV(txt);
  renderSections(sec);
});

document.getElementById('vagalumeFile')?.addEventListener('change', async (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  // tenta ler como texto (txt/docx/pdf não cobertos por simples FileReader para extrair texto; só txt suportado)
  if(f.type === 'text/plain'){
    const text = await f.text();
    document.getElementById('vagalumeText').value = text;
  } else {
    alert('Envie ficheiro .txt para leitura automática. Para outros ficheiros cole o texto no campo.');
  }
});

// gerar PDF simples
document.getElementById('vagalumeGenerate')?.addEventListener('click', async ()=>{
  const text = document.getElementById('vagalumeText').value.trim();
  if(!text){ alert('Cole ou escreva o conteúdo do CV antes.'); return; }
  // usa jsPDF CDN dinâmico
  if(!window.jsPDF){
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.body.appendChild(s);
    s.onload = ()=> createPdf(text);
  } else createPdf(text);
});

function createPdf(text){
  const { jsPDF } = window.jspdf || window.jspdf || window.jspdf;
  if(!jsPDF){
    alert('Falha ao carregar jsPDF.');
    return;
  }
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 10, 10);
  doc.save('CV-Vagalume.pdf');
}