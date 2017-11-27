'use strict';

const itemsList = document.querySelector(`.items-list`);

itemsList.addEventListener(`click`, handleBtns);

function handleBtns(e) {
  e.preventDefault();
  if (e.target.classList.contains(`add-to-cart`)) {
    addToCart(e.target.dataset);
  }
}