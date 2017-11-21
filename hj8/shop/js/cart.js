'use strict';

const itemsList = document.querySelector(`.items-list`);

itemsList.addEventListener(`click`, handleBtns);

function handleBtns(e) {
  if (e.target.classList.contains(`add-to-cart`)) {
    const targetData = e.target.dataset;
    addToCart(items.find(item => {
      return item.title === targetData.title
    }) ,targetData.title, targetData.price);
  }
}