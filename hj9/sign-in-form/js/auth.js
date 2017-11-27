'use strict';

const regForm = document.querySelector(`.sign-up-htm`);
const autForm = document.querySelector(`.sign-in-htm`);
const regBtn = regForm.querySelector(`.button`);
const autBtn = autForm.querySelector(`.button`);
const regUrl = `https://neto-api.herokuapp.com/signup`;
const autUrl = `https://neto-api.herokuapp.com/signin`;
const regOutput = regForm.querySelector(`output`);
const autOutput = autForm.querySelector(`output`);

regBtn.addEventListener(`click`, onRegClick);
autBtn.addEventListener(`click`, onAutClick);

function onRegClick(e) {
  e.preventDefault();
  setRequest(regUrl, new FormData(regForm));
}

function onAutClick(e) {
  e.preventDefault();
  setRequest(autUrl, new FormData(autForm));
}

function setRequest(url, data) {
  const sendForm = {};
  for (let item of data) {
    sendForm[item[0]] = item[1];
  }
  
  fetch(url, {
    body: JSON.stringify(sendForm),
    method: `POST`,
    headers: {
      'Content-Type': `application/json`
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (res.error) throw new Error(res.message);
    switch (url) {
      case regUrl:
        regOutput.textContent = `Пользователь ${res.name} успешно зарегистрирован`
        break;
      case autUrl:
        autOutput.textContent = `Пользователь ${res.name} успешно авторизован`
        break;
    }
  })
  .catch((err) => {
    switch (url) {
      case regUrl:
        regOutput.textContent = err.message;
        break;
      case autUrl:
        autOutput.textContent = err.message;
        break;
    }
  })
}