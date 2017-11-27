'use strict';

//Promise.all([getData(`https://neto-api.herokuapp.com/cart/colors`), 
//            getData(`https://neto-api.herokuapp.com/cart/sizes`)])
//.then((res) => setColorSize(res));

// Текущее состояние корзины
//console.log(getData(`https://neto-api.herokuapp.com/cart`));

const colorsWrapper = document.querySelector(`#colorSwatch`);
const sizesWrapper = document.querySelector(`#sizeSwatch`);

const currentColor = localStorage.currentColor;
const currentSize = localStorage.currentSize;

const addToCartBtn = document.querySelector(`#AddToCart`);
const cart = document.querySelector(`#quick-cart`);

getData(`https://neto-api.herokuapp.com/cart/colors`)
  .then((res) => setColor(res))
  .then((res) => colorsWrapper.addEventListener(`click`, onCheckbox));

getData(`https://neto-api.herokuapp.com/cart/sizes`)
  .then((res) => setSize(res))
  .then((res) => sizesWrapper.addEventListener(`click`, onCheckbox));

addToCartBtn.addEventListener(`click`, onAddBtnClick);
cart.addEventListener(`click`, onRemoveBtnClick);

function onCheckbox(e) {
  console.log(e.target.value);
  if (e.target.tagName === `INPUT` && this === colorsWrapper)
    localStorage.currentColor = e.target.value;
  else if (e.target.tagName === `INPUT` && this === sizesWrapper)
    localStorage.currentSize = e.target.value;
}

function onAddBtnClick(e) {
  e.preventDefault();
  
  const form = document.querySelector(`#AddToCartForm`);
  const formData = new FormData(form);
  formData.append(`productId`, form.dataset.productId); 
  
  fetch(`https://neto-api.herokuapp.com/cart`, {
    body: formData,
    method: `POST`, 
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    cart.innerHTML = ``;
    cart.appendChild(createCartElement(res[0].id, res[0].pic, res[0].title, res[0].quantity));
    cart.appendChild(formCart(getInCartItemsPrice(res[0].id)));
  })
  .catch((err) => {
    console.log(err);
  });
}

function onRemoveBtnClick(e) {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append(`productId`, e.target.dataset.id);
  
  if (e.target.classList.contains(`remove`)) {
    fetch(`https://neto-api.herokuapp.com/cart/remove`, {
      body: formData,
      method: `POST`, 
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      cart.innerHTML = ``;
      cart.appendChild(createCartElement(res[0].id, res[0].pic, res[0].title, res[0].quantity));
      cart.appendChild(formCart(getInCartItemsPrice(res[0].id)));
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
}

function createColorElement(title, type, code, isAvailable, isCurrent) {
  const div = document.createElement(`div`);
  let disabled = ``;
  let current = ``;
  div.dataset.value = `${type}`;
  div.className = `swatch-element color ${type}`;
  if (isAvailable) {
    div.classList.add(`available`);
  } else {
    div.classList.add(`soldout`);
    disabled = `disabled`;
  } 
  if (isCurrent) {
    current = `checked`;
  }
  div.innerHTML = 
    `<div class="tooltip">${title}</div>
     <input quickbeam="color" id="swatch-1-${type}" type="radio" name="color" value="${type}" ${current} ${disabled}>
     <label for="swatch-1-${type}" style="border-color: ${type};">
       <span style="background-color: ${type};"></span>
       <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
     </label>`;
  return div;
}

function createSizeElement(title, type, isAvailable, isCurrent) {
  const div = document.createElement(`div`);
  let disabled = ``;
  let current = ``;
  div.dataset.value = `${type}`;
  div.className = `swatch-element plain ${type}`;
  if (isAvailable) {
    div.classList.add(`available`);
  } else {
    div.classList.add(`soldout`);
    disabled = `disabled`;
  } 
  if (isCurrent) {
    current = `checked`;
  }
  div.innerHTML = 
    `<input id="swatch-0-${type}" type="radio" name="size" value="${type}" ${current} ${disabled}>
     <label for="swatch-0-${type}">
       ${title}
       <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
     </label>`;
  return div;
}

function createCartElement(itemId, imgSrc, title, count) {
  const div = document.createElement(`div`);
  div.id = `quick-cart-product-${itemId}`;
  div.className = 'quick-cart-product quick-cart-product-static';
  div.style.opacity = `1`;
  div.innerHTML = 
    `<div class="quick-cart-product-wrap">
       <img src="${imgSrc}" title="${title}">
       <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
       <span class="s2"></span>
     </div>
     <span class="count hide fadeUp" id="quick-cart-product-count-${itemId}">${count}</span>
     <span class="quick-cart-product-remove remove" data-id="${itemId}"></span>`;
  return div;
}

function getInCartItemsPrice(itemId) {
  const price = Number(cart.querySelector(`.s1`).textContent.replace(`$`, ``));
  const count = Number(cart.querySelector(`#quick-cart-product-count-${itemId}`).textContent);
  return price * count;
}

function formCart(totalPrice) {
  const cart = document.createElement(`A`);
  cart.id = `quick-cart-pay`;
  cart.setAttribute(`quickbeam`, `cart-pay`);
  cart.classList.add(`cart-ico`);
  if (totalPrice) {
    cart.classList.add(`open`);
  }
  cart.innerHTML = `
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">$${totalPrice}</span>
    </span>`;
  
  return cart;
}

function setColor(colors) {
  colors.forEach(color => {
    let isCurrent = false;
    if (color.type === currentColor) isCurrent = true;
    colorsWrapper.appendChild(createColorElement(color.title, color.type, color.code, color.isAvailable, isCurrent));
  });
}

function setSize(sizes) {
  sizes.forEach(size => {
    let isCurrent = false;
    if (size.type === currentSize) isCurrent = true;
    sizesWrapper.appendChild(createSizeElement(size.title, size.type, size.isAvailable, isCurrent));
  });
}

function getData(url) {
  return fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log(err);
  });
}