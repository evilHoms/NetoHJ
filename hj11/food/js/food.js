'use strict';

const url = `https://neto-api.herokuapp.com/food/42`;
const urlRating = `https://neto-api.herokuapp.com/food/42/rating`;
const urlConsumers = `https://neto-api.herokuapp.com/food/42/consumers`;

loadData(url)
  .then(res => addMainData(res))
  .catch(er => console.log(er));

loadData(urlRating)
  .then(res => addRatingData(res))
  .catch(er => console.log(er));

loadData(urlConsumers)
  .then(res => addConsumersData(res, document.querySelector(`[data-consumers]`)))
  .catch(er => console.log(er));


function loadData(url) {
  return new Promise(resolve => {
    const randName = randCallbackName(`callback`);
    window[randName] = resolve;
    addScript(`${url}?jsonp=${randName}`);
  });
}

function randCallbackName(base) {
  return base + Math.round(Math.random() * 10000);
}

function addScript(url) {
  const script = document.createElement(`SCRIPT`);
  script.src = url;
  script.setAttribute(`defer`, true);
  document.head.appendChild(script);
}

function addMainData(data) {
  document.querySelector(`[data-title]`).textContent = data.title;
  document.querySelector(`[data-ingredients]`).textContent = data.ingredients;
  document.querySelector(`[data-pic]`).style.backgroundImage = `url(${data.pic})`;
}

function addRatingData(data) {
  const rating = Math.round(data.rating * 100) / 100;
  document.querySelector(`[data-rating]`).textContent = rating;
  document.querySelector(`[data-votes]`).textContent = `(${data.votes} оценок)`;
  document.querySelector(`[data-star]`).style.width = `${rating * 10}%`;
}

function addConsumersData(data, wrapper) {
  data.consumers.forEach(el => {
    wrapper.appendChild(createConsumer(el));
  });
  const total = document.createElement(`SPAN`);
  total.textContent = `(+${data.total})`;
  wrapper.appendChild(total);
}

function createConsumer(consumerData) {
  const consumer = document.createElement(`IMG`);
  consumer.src = consumerData.pic;
  consumer.setAttribute(`title`, consumerData.name);
  
  return consumer;
}