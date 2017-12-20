'use strict';

const pupil = document.querySelector(`.big-book__pupil`);
const mouse = {
  x: null,
  y: null
};
const pupilPos = {
  x: pupil.getBoundingClientRect().x,
  y: pupil.getBoundingClientRect().y
};
let distance = null;

document.addEventListener(`mousemove`, onMouseMove);

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  distance = calculateDistance(mouse, pupilPos);
  setPupilSize();
  setPupilOffset(mouse)
}

function setPupilSize() {
  let size = ((window.innerWidth / 6) / distance) + 0.8;
  size < 1 ? size = 1 : size > 3 ? size = 3 : size = size;
  pupil.style.setProperty(`--pupil-size`, size);
}

function setPupilOffset() {
  let offsetX = (mouse.x - pupilPos.x) / (window.innerWidth / 2) * 30;
  let offsetY = (mouse.y - pupilPos.y) / (window.innerWidth / 2) * 30;
  
  pupil.style.setProperty(`--pupil-x`, offsetX + 'px');
  pupil.style.setProperty(`--pupil-y`, offsetY + 'px');
}

function calculateDistance(pointOne, pointTwo) {
  if (pointOne.x && pointOne.y && pointTwo.x && pointTwo.y) {
    return Math.sqrt(Math.pow(pointOne.x - pointTwo.x, 2) + Math.pow(pointOne.y - pointTwo.y, 2));
  } 
  else
    throw new Error(`calculateDistance wrong arguments!`);
}