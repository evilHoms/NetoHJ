'use strict';

const articles = document.querySelector(`.tabs-content`).children;
const tabsNav = document.querySelector(`.tabs-nav`);
const tabNavTemplateEl = tabsNav.firstElementChild;

tabsNav.removeChild(tabNavTemplateEl);
setTabs(articles);
initTabs(articles, 0);


function setTabs(articles) {
  Array.from(articles).forEach(el => {
    const tab = tabNavTemplateEl.cloneNode(true);
    tab.firstElementChild.className = `fa ${el.dataset.tabIcon}`;
    tab.firstElementChild.textContent = el.dataset.tabTitle;
    const newTab = tabsNav.appendChild(tab);
    newTab.firstElementChild.addEventListener(`click`, switchTabs);
  });
}

function initTabs(tabs, initIndex) {
  tabsNav.children[initIndex].classList.add(`ui-tabs-active`);
  Array.from(tabs).forEach(el => {
    el.classList.add(`hidden`);
  })
  tabs[initIndex].classList.remove(`hidden`);
}

function switchTabs(e) {
  Array.from(this.parentElement.parentElement.children).forEach(el => {el.classList.remove(`ui-tabs-active`)});
  this.parentElement.classList.add(`ui-tabs-active`);
  Array.from(articles).forEach(el => {el.classList.add(`hidden`)});
  Array.from(articles).find(el => {
    return this.classList.contains(el.getAttribute(`data-tab-icon`));
  }).classList.remove(`hidden`);
}

