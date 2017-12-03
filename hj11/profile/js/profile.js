'use strict';

const url = `https://neto-api.herokuapp.com/profile/me`;

loadData(url)
  .then(res => {
    setDataToProfile(res);
    return res.id;
  })
  .then(res => loadData(`https://neto-api.herokuapp.com/profile/${res}/technologies`))
  .then(res => setTechToProfile(res))
  .then(() => document.querySelector(`.content`).style.display = `initial`)
  .catch(er => console.log(er));


function loadData(url) {
  return new Promise((resolve) => {
    const randCallback = randCallbackName(`callback`);
    window[randCallback] = resolve;
    addScript(`${url}?jsonp=${randCallback}`);
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

function setTechToProfile(data) {
  const techWrapper = document.querySelector(`[data-technologies]`);
  data.forEach(tech => techWrapper.appendChild(addTech(tech)));
} 

function setDataToProfile(data) {
  document.querySelector(`[data-name]`).textContent = data.name;
  document.querySelector(`[data-description]`).textContent = data.description;
  document.querySelector(`[data-pic]`).src = data.pic;
  document.querySelector(`[data-position]`).textContent = data.position;
}

function addTech(techName) {
  const tech = document.createElement(`SPAN`);
  tech.className = `devicons devicons-${techName}`;
  return tech;
}