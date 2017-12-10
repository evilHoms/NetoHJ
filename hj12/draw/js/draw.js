'use strict';

const canvas = document.querySelector(`#draw`);
const ctx = canvas.getContext(`2d`);
const brush = new Brush(ctx);
const mouse = {
  x: 0,
  y: 0,
  prevX: 0,
  prevY: 0,
  isDown: false
};

setCanvasSize();


window.addEventListener(`resize`, onWindowResize);
canvas.addEventListener(`dblclick`, onCanvasDblClick);
canvas.addEventListener(`mousedown`, onCanvasMouseDown);
canvas.addEventListener(`mouseup`, onCanvasMouseUp);
canvas.addEventListener(`mousemove`, onCanvasMouseMove);
canvas.addEventListener(`mouseout`, onMouseOut);



function onWindowResize(e) {
  clearCanvas();
  setCanvasSize();
}

function onCanvasDblClick(e) {
  clearCanvas();
}

function onCanvasMouseDown(e) {
  mouse.isDown = true;
}

function onCanvasMouseUp(e) {
  mouse.isDown = false;
}

function onCanvasMouseMove(e) {
  updateMouse(e.clientX, e.clientY);
  if (mouse.isDown) {
    brush.draw(mouse.prevX, mouse.prevY, mouse.x, mouse.y, e.shiftKey);
  }
}

function updateMouse(x, y) {
  mouse.prevX = mouse.x;
  mouse.prevY = mouse.y;
  mouse.x = x;
  mouse.y = y;
}

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onMouseOut(e) {
  clearCanvas();
  mouse.isDown = false;
}