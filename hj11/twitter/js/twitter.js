'use strict';

const url = `https://neto-api.herokuapp.com/twitter/jsonp?jsonp=response`;

loadData(url)
  //.then(res => console.log(res))
  .then(res => setData(res))
  .catch(er => console.log(er));


function loadData(url) {
  return new Promise((res, rej) => {
    window.response = res;

    addScript(url);
  });
}

function addScript(url) {
  const script = document.createElement(`script`);
  script.src = url;
  script.setAttribute(`defer`, true);
  document.head.appendChild(script);
}

function setData(dataObj) {
  document.querySelector(`[data-wallpaper]`).src = dataObj.wallpaper;
  document.querySelector(`[data-username]`).textContent = dataObj.username;
  document.querySelector(`[data-description]`).textContent = dataObj.description;
  document.querySelector(`[data-pic]`).src = dataObj.pic;
  document.querySelector(`[data-tweets]`).textContent = dataObj.tweets;
  document.querySelector(`[data-followers]`).textContent = dataObj.followers;
  document.querySelector(`[data-following]`).textContent = dataObj.following;
}