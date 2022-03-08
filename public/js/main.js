const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//obtenemos el usuario y la sala de la url
//qs es un modulo de npm que sirve para convertir y formatear datos
//primero cogemos la url usando qs
const { username, room, avatar } = Qs.parse(location.search, {
  //despues, con ignoreQueryPrefix quitamos los simbolos de la url que van antes del nombre y la sala
  ignoreQueryPrefix: true,
});

const socket = io();

//unirse a la sala
socket.emit('joinRoom', { username, room, avatar });

//obtener la sala y el usuario
socket.on('roomUsers', ({ room, users }) => {
  /*usamos las funciones que creamos abajo para obtener la informacion de 
  la sala y los usuarios*/
  outputRoomName(room);
  outputUsers(users);
});

//enviar mensajes
socket.on('message', (message) => {
  //usamos la funcion que creamos abajo para mostrar en el html el mensaje
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//declaramos lo que hacemos al enviar el mensaje con el boton submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //obtiene el mensaje
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  //envia el mensaje al servidor
  socket.emit('chatMessage', msg);

  //volvemos a poner el mensaje a cadena vacia
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//enviamos el mensaje al html con DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

//mostramos el nombre de la sala
function outputRoomName(room) {
  roomName.innerText = room;
}

//mostramos los usuarios
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
    const img = document.createElement('img');
    img.classList.add('avatar');
    img.src = '../' + user.avatar;
    userList.appendChild(img);
    console.log(img)
  });
}

//mensaje de aviso antes de abandonar la sala
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('¿seguro que quieres abandonar la sala?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
