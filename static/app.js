const socket = io();
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const messageInput = document.getElementById('message');
const chatBox = document.getElementById('chat-box');
const joinButton = document.getElementById('join');
const sendButton = document.getElementById('send');

// Evento para unirse a una sala
joinButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const room = roomInput.value.trim();
    if (username && room) {
        socket.emit('join', { username, room });
        usernameInput.disabled = true;
        roomInput.disabled = true;
        joinButton.disabled = true;
    } else {
        alert("Please enter both a username and a room name!");
    }
});

// Enviar mensaje al presionar Enter
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage(); // Reutiliza la misma función del botón Send
    }
});

// Enviar mensaje al hacer clic en el botón Send
sendButton.addEventListener('click', sendMessage);

// Función para enviar mensaje
function sendMessage() {
    const message = messageInput.value.trim();
    const username = usernameInput.value.trim();
    const room = roomInput.value.trim();
    if (message && username && room) {
        socket.emit('message', { message, username, room });
        messageInput.value = ''; // Limpia el campo de texto
    } else {
        alert("Please make sure you've joined a room and entered a message.");
    }
}

// Mostrar mensajes recibidos
socket.on('message', (msg) => {
    const div = document.createElement('div');
    div.textContent = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight; // Hace scroll automático hacia el último mensaje
});