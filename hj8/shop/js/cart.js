'use strict';

const itemsList = document.querySelector(`.items-list`);

itemsList.addEventListener(`click`, handleBtns);

function handleBtns(e) {
  e.preventDefault();
  if (e.target.classList.contains(`add-to-cart`)) {
    addToCart(items.find(item => { return item.title === e.target.dataset.title }) 
              ,e.target.dataset.title, e.target.dataset.price);
  }
}