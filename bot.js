// bot.js — Assistente Infolearn

(function() {
  // Criar container do bot
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

  // Estilos do bot
  const style = document.createElement('style');
  style.innerHTML = `
    #infolearn-bot { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: Arial, sans-serif; }
    #bot-bubble { background: #0078d7; color: #fff; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); font-size: 24px; }
    #bot-window { width: 320px; height: 400px; background: #fff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; }
    #bot-header { background: #0078d7; color: white; padding: 10px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
    #bot-messages { flex: 1; padding: 10px; overflow-y: auto; font-size: 14px; }
    #bot-input { border: none; border-top: 1px solid #ccc; padding: 10px; outline: none; }
    .hidden { display: none; }
    .bot-msg, .user-msg { margin: 5px 0; padding: 8px 10px; border-radius: 8px; max-width: 80%; word-wrap: break-word; }
    .bot-msg { background: #e7f1ff; align-self: flex-start; }
    .user-msg { background: #d1ffd7; align-self: flex-end; }
    .course-btn { display: block; margin: 5px 0; padding: 6px 10px; background: #0078d7; color: white; border: none; border-radius: 6px; cursor: pointer; text-align: left; }
    .course-btn:hover { background: #005fa3; }
    .counter-display { font-weight: bold; color: #0078d7; }
  `;
  document.head.appendChild(style);

  const bubble = document.getElementById('bot-bubble');
  const windowEl = document.getElementById('bot-window');
  const close = document.getElementById('bot-close');
  const messages = document.getElementById('bot-messages');
  const input = document.getElementById('bot-input');

  // Funções para mensagens
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

  // Contadores de adesão
  function getCounter(id) {
    const val = localStorage.getItem('counter_' + id);
    return val ? parseInt(val, 10) : 0;
  }

  function incrementCounter(id) {
    const curr = getCounter(id) + 1;
    localStorage.setItem('counter_' + id, curr);
    return curr;
  }

  function getCounterDisplay(id) {
    return `<span class="counter-display">${getCounter(id)}</span> pessoas inscritas`;
  }

  // Cursos
  const courses = [
    {id:'designer', name:'Designer Gráfico', price:'1 mês: 2500 MT | 3 meses: 5500 MT'},
    {id:'ingles', name:'Inglês', price:'1 mês: 1200 MT | 3 meses: 3600 MT'},
    {id:'informatica', name:'Informática', price:'1 mês: 1300 MT | 3 meses: 3500 MT'},
    {id:'musica', name:'Música', price:'1 mês: 2500 MT | 3 meses: 5300 MT'},
    {id:'confeitaria', name:'Confeitaria', price:'Inscrição: 500 MT | Investimento: 3000 MT'}
  ];

  function showCourses() {
    botSay('📚 Aqui estão nossos cursos disponíveis:');
    courses.forEach(course => {
      botSay(`<button class="course-btn" data-id="${course.id}">${course.name} — ${course.price} — ${getCounterDisplay(course.id)}</button>`);
    });
    // Eventos dos botões
    messages.querySelectorAll('.course-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        incrementCounter(id);
        btn.innerHTML = `${courses.find(c=>c.id===id).name} — ${courses.find(c=>c.id===id).price} — ${getCounterDisplay(id)}`;
        botSay(`✅ Sua inscrição no curso "${courses.find(c=>c.id===id).name}" foi registrada. Entraremos em contato via WhatsApp para confirmação.`);
      };
    });
  }

  // Processar entrada do usuário
  function processInput(text) {
    const lower = text.toLowerCase();
    if (lower.includes('curso')) {
      showCourses();
    } else if (lower.includes('inscrição')) {
      botSay('Para se inscrever, clique no curso desejado acima e siga o procedimento via WhatsApp.');
    } else if (lower.includes('contato') || lower.includes('whatsapp') || lower.includes('email')) {
      botSay('Nosso WhatsApp: +258 84 418 0213 📞<br>Email: info@infolearn.com 📧');
    } else if (lower.includes('olá') || lower.includes('oi')) {
      botSay('Olá! Posso ajudar com cursos, inscrições ou contato.');
    } else {
      botSay('Posso te ajudar com: cursos, inscrição ou contato. Digite uma destas opções.');
    }
  }

  // Eventos de abertura e fechamento do bot
  bubble.onclick = () => {
    bubble.classList.add('hidden');
    windowEl.classList.remove('hidden');
    botSay('👋 Olá! Sou o assistente Infolearn. Como posso ajudar?');
  };

  close.onclick = () => {
    windowEl.classList.add('hidden');
    bubble.classList.remove('hidden');
  };

  // Entrada de texto
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      userSay(input.value);
      processInput(input.value);
      input.value = '';
    }
  });

})();
