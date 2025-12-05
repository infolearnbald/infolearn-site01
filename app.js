// Toggle menu mobile
function toggleNav() {
    const nav = document.getElementById('nav-links');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Modal login/signup
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalAction = document.getElementById('modal-action');
const modalSwitch = document.getElementById('modal-switch');

document.getElementById('btnLogin').addEventListener('click', () => abrirModal('login'));
document.getElementById('btnSignup').addEventListener('click', () => abrirModal('signup'));

function abrirModal(tipo) {
    modal.style.display = 'flex';
    if(tipo === 'login') {
        modalTitle.innerText = 'Login';
        modalAction.innerText = 'Entrar';
        modalSwitch.innerHTML = 'Não tem conta? <span onclick="abrirModal(\'signup\')">Cadastrar-se</span>';
    } else {
        modalTitle.innerText = 'Cadastro';
        modalAction.innerText = 'Cadastrar';
        modalSwitch.innerHTML = 'Já tem conta? <span onclick="abrirModal(\'login\')">Entrar</span>';
    }
}

window.onclick = function(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
}