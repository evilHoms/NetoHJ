'use strict';

const xhr = new XMLHttpRequest();
const content = document.querySelector(`#content`);

setRequest(`https://neto-api.herokuapp.com/book/`);

xhr.addEventListener(`load`, onResponse);

function setRequest(path) {
  xhr.open('GET', path);
  xhr.send();
}

function onResponse(e) {
  content.innerHTML = ``;
  JSON.parse(xhr.responseText).forEach(book => {
    addItem(book);
  });
}

function addItem(book) {
  content.innerHTML += `
    <li
         data-title="${book.title}"
         data-author="${book.author.name}"
         data-info="${book.info}"
         data-price="${book.price}">
       <img src="${book.cover.small}">
    </li>`;
}