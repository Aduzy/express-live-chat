const nicknames = ["Liam", "Noah", "Oliver", "Olivia", "Emma", "Ava"];
const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];

const socket = io.connect();

socket.emit('newUser', {
    nickname: nickname
});

let message = document.getElementById("message"),
    messagesList = document.getElementById("messagesList"),
    btn = document.getElementById("sendButton");

btn.addEventListener('click', () => {
    socket.emit('message', {
        author: nickname,
        message: message.value
    });
    message.value = "";
});

socket.on('newUser.return', (data) => {
    messagesList.innerHTML += `<i><strong>${data.nickname}</strong> joined</i><br>`;
});

socket.on('disconnect.return', (data) => {
    messagesList.innerHTML += `<i><strong>${data.nickname}</strong> disconnected</i><br>`;
});

socket.on('message.return', (data) => {
    messagesList.innerHTML += `<strong>${data.author}:</strong> ${data.message}<br>`;
});