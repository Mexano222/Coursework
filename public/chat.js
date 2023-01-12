const socket = io();

let form = document.getElementById('form-message');
let input = document.getElementById('input-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-send-message', input.value);
        input.value = '';
    }
});