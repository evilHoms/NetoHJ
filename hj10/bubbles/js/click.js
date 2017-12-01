'use strinct';

const wsConnection = new WebSocket(`wss://neto-api.herokuapp.com/mouse`);

wsConnection.addEventListener(`open`, onWsOpen);
window.addEventListener(`beforeunload`, onWindowClose);
document.addEventListener(`click`, onDocumentClick);

function onWsOpen(e) {
  showBubbles(this);
}

function onWindowClose(e) {
  wsConnection.onclose = function() {};
  wsConnection.close();
}

function onDocumentClick(e) {
  wsConnection.send(JSON.stringify({x: e.pageX, y: e.pageY}));
}