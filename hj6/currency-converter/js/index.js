'use strict';

const value = document.querySelector(`#source`);
const from = document.querySelector(`#from`);
const to = document.querySelector(`#to`);
const result = document.querySelector(`#result`);

let fromValue;
let toValue;

value.addEventListener(`input`, convert);
from.addEventListener(`input`, convert);
to.addEventListener(`input`, convert);

setRequest(`https://neto-api.herokuapp.com/currency`);





function setRequest(url) {
  document.querySelector(`#loader`).classList.remove(`hidden`);
  const xhr = new XMLHttpRequest();
  xhr.open(`GET`, url);
  xhr.send();
  
  xhr.addEventListener(`load`, (e) => {onResponse(e, xhr)});
}

function onResponse(e, xhr) {
  const listToWrite = xhr.responseText;
  
  setOptions(listToWrite, from);
  setOptions(listToWrite, to);
  fromValue = from.querySelector(`[data-code="${from.value}"]`).dataset.value;;
  toValue = to.querySelector(`[data-code="${to.value}"]`).dataset.value;;
  convert();
  
  document.querySelector(`#loader`).classList.add(`hidden`);
  document.querySelector(`#content`).classList.remove(`hidden`);
}

function setOptions(currency, select) {
  select.innerHTML = ``;
  const objList = JSON.parse(currency);
  for (let i in objList) {
    select.innerHTML += `<option data-value="${objList[i].value}" data-title="${objList[i].title}" data-code="${objList[i].code}">${objList[i].code}</option>`;
  }
}

function convert() {
  if (this === from)
    fromValue = from.querySelector(`[data-code="${this.value}"]`).dataset.value;
  else if (this === to)
    toValue = to.querySelector(`[data-code="${this.value}"]`).dataset.value;

  result.textContent =  fromValue / toValue * value.value;
}