'use strict';

const done = document.querySelector(`.done`);
const undone = document.querySelector(`.undone`);
const labelsList = document.querySelectorAll(`.done label, .undone label`);

labelsList.forEach(el => {
  el.addEventListener(`change`, switchList);
});

function switchList(e) {
  this.parentElement === done ? toUndone(this) : toDone(this);
  
  function toDone(element) {
    element.querySelector(`input`).setAttribute(`checked`, true);
    done.appendChild(element);
  }
  
  function toUndone(element) {
    element.querySelector(`input`).removeAttribute(`checked`);
    undone.appendChild(element);
  }
}