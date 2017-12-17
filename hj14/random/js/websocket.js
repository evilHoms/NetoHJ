'use strict';

const blocks = document.querySelectorAll(`.websocket div`);
const ws = new WebSocket(`wss://neto-api.herokuapp.com/comet/websocket`);

ws.addEventListener(`message`, onWsMsg);

function onWsMsg(e) {
  Array.from(blocks)
    .map(resetBlocks);
  blocks[Number(e.data) - 1].classList.add(`flip-it`);
}

function resetBlocks(block) {
  block.classList.remove(`flip-it`);
}