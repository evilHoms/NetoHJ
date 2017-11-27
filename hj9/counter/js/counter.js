'use strict';

const counter = document.querySelector(`#counter`);
const increment = document.querySelector(`#increment`);
const decrement = document.querySelector(`#decrement`);
const reset = document.querySelector(`#reset`);

localStorage.counter ? counter.textContent = localStorage.counter : counter.textContent = 0;

increment.addEventListener(`click`, onBtnClick);
decrement.addEventListener(`click`, onBtnClick);
reset.addEventListener(`click`, onBtnClick);

function onBtnClick(e) {
  switch (e.target) {
    case increment:
      counter.textContent = ++counter.textContent;
      break;
    case decrement:
      counter.textContent = --counter.textContent;
      break;
    case reset:
      counter.textContent = 0;
      break;
  }
  
  localStorage.counter = counter.textContent;
}