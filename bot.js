// bot-advanced.js — Assistente Infolearn Nível 2
(function() {
  const botContainer = document.createElement('div');
  botContainer.id = 'infolearn-bot';
  botContainer.innerHTML = `
    <div id="bot-bubble">💬</div>
    <div id="bot-window" class="hidden">
      <div id="bot-header">Assistente Infolearn <span id="bot-close">×</span></div>
      <div id="bot-messages"></div>
      <input type="text" id="bot-input" placeholder="Escreva aqui..." />
    </div>
  `;
  document.body.appendChild(botContainer);

  // Estilos
  const style = document.createElement('style');
  style.innerHTML = `
    #infolearn-bot { position: fixed; top: 20px; right: 20px; z-index: 9999; font-family: Arial, sans-serif; }
    #bot-bubble { background: #0078d7; color: #fff; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); font-size: 24px; animation: pulse 2s infinite; transition: transform 0.3s ease, right 0.5s ease, top 0.5s ease; }
    #bot-bubble:hover { transform: scale(1.1); }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
    #bot-window { width: 90%; max-width: 400px; max-height: 500px; height: auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; position: fixed; top: -600px; right: 20px; transition: all 0.5s ease; z-index: 9999; }
    #bot-window.show { top: 20px; }
    #bot-header { background: #0078d7; color: white; padding: 10px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 16px; cursor: move; }
    #bot-messages { flex: 1; padding: 10px; overflow-y: auto; font-size: 14px; }
    #bot-input { border: none; border-top: 1px solid #ccc; padding: 10px; outline: none; font-size: 14px; }
    .hidden { display: none; }
    .bot-msg, .user-msg { margin: 5px 0; padding: 8px 10px; border-radius: 8px; max-width: 80%; word-wrap: break-word; }
    .bot-msg { background: #e7f1ff; align-self: flex-start; }
    .user-msg { background: #d1ffd7; align-self: flex-end; }
    .course-btn { display: block; margin: 5px 0; padding: 6px 10px; background: #0078d7; color: white; border: none; border-radius: 6px; cursor: pointer; text-align: left; font-size: 14px; }
    .course-btn:hover { background: #005fa3; }
    .counter-display { font-weight: bold; color: #0078d7; }

    @media (max-width: 480px) {
      #bot-window { width: 90%; top: -500px; right: 5%; max-height: 400px; font-size: 14px; }
      #bot-header { font-size: 14px; }
      #bot-input { font-size: 13px; padding: 8px; }
      .course-btn { font-size: 13px; padding: 5px 8px; }
    }
  `;
  document.head.appendChild(style);

  const bubble = document.getElementById('bot-bubble');
  const windowEl = document.getElementById('bot-window');
  const close = document.getElementById('bot-close');
  const messages = document.getElementById('bot-messages');
  const input = document.getElementById('bot-input');

  function botSay(text) {
    const msg = document.createElement('div');
    msg.className = 'bot-msg';
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  function userSay(text) {
    const msg = document.createElement('div');
    msg.className = 'user-msg';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function getCounter(id) { const val = localStorage.getItem('counter_' + id); return val ? parseInt(val, 10) : 0; }
  function incrementCounter(id) { const curr = getCounter(id) + 1; localStorage.setItem('counter_' + id, curr); return curr; }
  function getCounterDisplay(id) { return `<span class="counter-display">${getCounter(id)}</span> pessoas inscritas`; }

  const courses = [
    {id:'designer', name:'Designer Gráfico', price:'1 mês: 2500 MT | 3 meses: 5500 MT', phone:'258867101103'},
    {id:'ingles', name:'Inglês', price:'1 mês: 1200 MT | 3 meses: 3600 MT', phone:'258877537100'},
    {id:'informatica', name:'Informática', price:'1 mês: 1300 MT | 3 meses: 3500 MT', phone:'258844180213'},
    {id:'musica', name:'Música', price:'1 mês: 2500 MT | 3 meses: 5300 MT', phone:'258844180213'},
    {id:'confeitaria', name:'Confeitaria', price:'Inscrição: 500 MT | Investimento: 3000 MT', phone:'258844180213'}
  ];

  function showCourses() {
    botSay('📚 Aqui estão nossos cursos disponíveis:');
    courses.forEach(course => {
      botSay(`<button class="course-btn" data-id="${course.id}">${course.name} — ${course.price} — ${getCounterDisplay(course.id)}</button>`);
    });
    messages.querySelectorAll('.course-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        incrementCounter(id);
        btn.innerHTML = `${courses.find(c=>c.id===id).name} — ${courses.find(c=>c.id===id).price} — ${getCounterDisplay(id)}`;

        // Abrir WhatsApp após inscrição
        const phone = courses.find(c=>c.id===id).phone;
        const msg = encodeURIComponent(`Olá, quero me inscrever no curso ${courses.find(c=>c.id===id).name}`);
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');

        botSay(`✅ Sua inscrição no curso "${courses.find(c=>c.id===id).name}" foi registrada. WhatsApp do docente aberto.`);
      };
    });
  }

  function processInput(text) {
    const lower = text.toLowerCase();
    if (lower.includes('curso')) showCourses();
    else if (lower.includes('inscrição')) botSay('Clique no curso desejado acima para se inscrever via WhatsApp.');
    else if (lower.includes('contato') || lower.includes('whatsapp') || lower.includes('email'))
      botSay('Nosso WhatsApp: +258 84 418 0213 📞<br>Email: info@infolearn.com 📧');
    else botSay('Posso te ajudar com: cursos, inscrição ou contato. Digite uma destas opções.');
  }

  // Bolha com animação de deslize
  bubble.onclick = () => {
    bubble.classList.add('hidden');
    windowEl.classList.add('show');
    botSay('👋 Olá! Sou o assistente Infolearn. Como posso ajudar?');
  };

  close.onclick = () => {
    windowEl.classList.remove('show');
    bubble.classList.remove('hidden');
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      userSay(input.value);
      processInput(input.value);
      input.value = '';
    }
  });

  // Lembrete automático a cada 2 dias
  const lastReminder = localStorage.getItem('lastReminder');
  const now = Date.now();
  if (!lastReminder || (now - lastReminder) > 2*24*60*60*1000) {
    botSay('⏰ Lembrete Infolearn: verifique nossos cursos e inscreva-se! Compartilhe com amigos.');
    localStorage.setItem('lastReminder', now);
  }
})();
