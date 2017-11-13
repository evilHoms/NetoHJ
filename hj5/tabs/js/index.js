'use strict';

const tabs = document.querySelectorAll(`.tabs nav > a`);
const content = document.querySelector(`#content`);
const preloader = document.querySelector(`#preloader`);
const xhr = new XMLHttpRequest();

tabs.forEach(tab => {
  tab.addEventListener(`click`, tabOnClick);
});
xhr.addEventListener('load', onResponse);

getContent("components/email-tab.html");

function tabOnClick(e) {
  e.preventDefault();
  tabs.forEach(toggleActive);
  getContent(this.getAttribute(`href`));
}

function onResponse() {
  preloader.classList.toggle(`hidden`);
  content.innerHTML = xhr.responseText;
}

function getContent(adress) {
  xhr.open('GET', `https://netology-code.github.io/hj-homeworks/xhr/tabs/${adress}`);
  xhr.send();
  preloader.classList.toggle(`hidden`);
}

function toggleActive(tab) {
  tab.classList.toggle(`active`);
}