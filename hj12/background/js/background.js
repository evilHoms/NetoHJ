'use strict';

const canvas = document.querySelector(`#wall`);
const ctx = canvas.getContext(`2d`);
const crosses = [];
const rounds = [];

init();
startAnimation(20);

function startAnimation(fps) {
  const mainLoop = setInterval(onFrameChange, 1000 / fps);
  
  function onFrameChange() {
    clearCanvas();
    const length = crosses.length;
    for (let i = 0; i < length; i++) {
      crosses[i].update();
      rounds[i].update();
    }
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const numberOfObjects = getRandomInRange(50, 200);
  
  for (let i = 0; i < numberOfObjects; i++) {
    crosses.push(new Cross(ctx, getRandomPos(), getRandomTimeFunction()));
    rounds.push(new Round(ctx, getRandomPos(), getRandomTimeFunction()));
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomPos() {
  return {
    x: getRandomInRange(0, canvas.width),
    y: getRandomInRange(0, canvas.height)
  }
}

function getRandomTimeFunction() {
  return Math.round() % 2 === 0 ? nextPointFirst : nextPointSecond;
  
  function nextPointFirst(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  }

  function nextPointSecond(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
}