//creamos las funciones aparte y las exportamos en server.js para usarlas ahi

const users = [];

//unirse a la sala, añadirmos a nuestra lista de usuarios uno nuevo
function userJoin(id, username, room, avatar) {
  const user = { id, username, room, avatar };

  users.push(user);

  return user;
}

//obtener usuario
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

//salir de la sala, borramos de la lista de usuarios el actual
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//obtener los usuarios de la sala
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
