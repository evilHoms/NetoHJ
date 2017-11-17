'use strict';

const contentForm = document.querySelector(`.contentform`);
const yourMsg = document.querySelector(`main`);
const inputs = contentForm.querySelectorAll(`input, textarea`);
const sendBtn = contentForm.querySelector(`.button-contact`);
const yourMsgOutputs = yourMsg.querySelector(`outputs`);
const changeBtn = yourMsg.querySelector(`.button-contact`);

sendBtn.addEventListener(`click`, sendingForm);
changeBtn.addEventListener(`click`, changeForm);
inputs.forEach(el => {
  el.addEventListener(`input`, checkCorrect);
});


function isCompleted(list) {
  let isComplete = true;
  list.forEach(item => {
    if (item.value === ``)
      isComplete = false;
  });
  return isComplete ? true : false;
}

function fixFormat(string) {
  return string.replace(/\D/g, ``);
}

function checkCorrect(e) {
  if (this.name === `zip`)
    this.value = fixFormat(this.value);
  if (isCompleted(inputs))
    sendBtn.removeAttribute(`disabled`);
}

function sendingForm(e) {
  e.preventDefault();
  contentForm.classList.add(`hidden`);
  yourMsg.classList.remove(`hidden`);
  
  fillOutputs(inputs);
}

function fillOutputs(inputs) {
  inputs.forEach(input => {
    const output = yourMsg.querySelector(`output#${input['name']}`);
    if (output)
      output.value = input.value;
  });
}

function changeForm(e) {
  contentForm.classList.remove(`hidden`);
  yourMsg.classList.add(`hidden`);
}
