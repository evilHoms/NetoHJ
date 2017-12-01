'use strinct';

const counter = document.querySelector(`.counter`);
const errors = document.querySelector(`output.errors`);

const wsConnection = new WebSocket(`wss://neto-api.herokuapp.com/counter`);

wsConnection.addEventListener(`message`, onWsMessage);
window.addEventListener(`beforeunload`, onWindowClose);

function onWsMessage(e) {
  const res = JSON.parse(e.data);
  counter.textContent = res.connections;
  errors.textContent = res.errors;
}

function onWindowClose(e) {
  wsConnection.onclose = function() {};
  wsConnection.close(1000);
}