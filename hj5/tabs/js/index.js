'use strict';

const tabs = document.querySelectorAll(`.tabs nav > a`);
const content = document.querySelector(`#content`);
const preloader = document.querySelector(`#preloader`);
const xhr = new XMLHttpRequest();

tabs.forEach(tab => {
  tab.addEventListener(`click`, tabOnClick);
});
xhr.addEventListener('load', onResponse);
xhr.addEventListener(`loadend`, onLoadEnd);

getContent("components/email-tab.html");

function tabOnClick(e) {
  e.preventDefault();
  if (!this.classList.contains(`active`)) {
    tabs.forEach(toggleActive);
    getContent(this.getAttribute(`href`));
  }
}

function onResponse() {
  content.innerHTML = xhr.responseText;
}

function onLoadEnd() {
  preloader.classList.toggle(`hidden`);
}

function getContent(adress) {
  xhr.open('GET', `https://netology-code.github.io/hj-homeworks/xhr/tabs/${adress}`);
  xhr.send();
  preloader.classList.toggle(`hidden`);
}

function toggleActive(tab) {
  tab.classList.toggle(`active`);
}