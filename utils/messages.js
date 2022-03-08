/*moment es una libreria para formatear fechas y horas, la usaremos para 
mostrar la hora del mensaje enviado*/

const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
