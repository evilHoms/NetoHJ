'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

editor.addEventListener('update', onCanvasDraw);

function onCanvasDraw(e) {
  canvas.toBlob(blob => {
    ws.send(blob);
  });
}