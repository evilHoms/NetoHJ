'use strict';

const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);

canvas.addEventListener(`click`, onCanvasClick);

generateSky();


function onCanvasClick(e) {
  clearCanvas();
  generateSky();
}

function generateSky() {
  const numberOfStars = getRandomInRange(200, 400);
  for (let i = 0; i < numberOfStars; i++) {
    const randomColor = getRandomColor();
    const randomPos = {
      x: getRandomInRange(0, canvas.width),
      y: getRandomInRange(0, canvas.height)
    };
    const newStar = new Star(ctx, 
                           getRandomInRange(0, 0.55),
                           randomColor,
                           getRandomInRange(0.8, 1),
                           randomPos);
    newStar.draw();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
  const color = Math.round(getRandomInRange(0, 2));
  return color === 0 ? '#ffffff' : color === 1 ? '#ffe9c4' : '#d4fbff';
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}