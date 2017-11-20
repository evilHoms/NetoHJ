'use strict';

const slides = document.querySelector(`.slides`).children;
const activeClass = `slide-current`;
const disableClass = `disabled`;
const nextBtn = document.querySelector(`[data-action='next']`);
const prevBtn = document.querySelector(`[data-action='prev']`);
const firstBtn = document.querySelector(`[data-action='first']`);
const lastBtn = document.querySelector(`[data-action='last']`);

init(slides[0]);

nextBtn.addEventListener(`click`, changeSlide);
prevBtn.addEventListener(`click`, changeSlide);
firstBtn.addEventListener(`click`, changeSlide);
lastBtn.addEventListener(`click`, changeSlide);

function init(slide) {
  slide.classList.add(activeClass);
  checkFirstLastSlide(slide);
}

function changeSlide(e) {
  if (this.classList.contains(disableClass)) return;
  
  const currentSlide = Array.from(slides).find(el => {
    return el.classList.contains(activeClass);
  });
  
  currentSlide.classList.remove(activeClass);
  
  const newSlide = this === nextBtn ? 
    currentSlide.nextElementSibling :
  this === prevBtn ?
    currentSlide.previousElementSibling :
  this === firstBtn ?
    currentSlide.parentElement.firstElementChild :
    currentSlide.parentElement.lastElementChild;
  
  newSlide.classList.add(activeClass);
  checkFirstLastSlide(newSlide);
}

function checkFirstLastSlide(slide) {
  if (slide === slide.parentElement.firstElementChild) {
    nextBtn.classList.remove(disableClass);
    lastBtn.classList.remove(disableClass);
    prevBtn.classList.add(disableClass);
    firstBtn.classList.add(disableClass);
  } 
  else if (slide === slide.parentElement.lastElementChild) {
    prevBtn.classList.remove(disableClass);
    firstBtn.classList.remove(disableClass);
    nextBtn.classList.add(disableClass);
    lastBtn.classList.add(disableClass);
  } 
  else {
    prevBtn.classList.remove(disableClass);
    firstBtn.classList.remove(disableClass);
    nextBtn.classList.remove(disableClass);
    lastBtn.classList.remove(disableClass);
  }
}