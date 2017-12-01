'use strinct';
const chat = document.querySelector(`.chat`);
const messageBox = chat.querySelector(`.message-box`);
const messageInput = chat.querySelector(`.message-input`);
const messageSubmit = chat.querySelector(`.message-submit`);
const messageContent = chat.querySelector(`.messages-content`);
const chatStatus = chat.querySelector(`.chat-status`);

const wsConnection = new WebSocket(`wss://neto-api.herokuapp.com/chat`);

wsConnection.addEventListener(`open`, onWsOpen);
wsConnection.addEventListener(`message`, onWsMessage);
wsConnection.addEventListener(`close`, onWsClose);
window.addEventListener(`beforeunload`, onWindowClose);
messageSubmit.addEventListener(`click`, onSubmitClick);


function onWsOpen(e) {
  messageSubmit.removeAttribute(`disabled`);
  chatStatus.textContent = chatStatus.dataset.online;
  addStatusMessage(`Пользователь появился в сети`);
}

function onWsMessage(e) {
  if (e.data === `...`) {
    console.log(`Печатает сообщение`);
    addLoadingMessage();
  }
  else {
    console.log(e);
    removeLoadingMessage();
    addIncomingMessage(e.data);
  }
}

function onWsClose(e) {
  messageSubmit.setAttribute(`disabled`, true);
  chatStatus.textContent = chatStatus.dataset.offline;
  addStatusMessage(`Пользователь не в сети`);
}

function onSubmitClick(e) {
  e.preventDefault();
  addOutgoingMessage(messageInput.value);
  messageInput.value = ``;
}

function onWindowClose(e) {
  wsConnection.onclose = function() {};
  wsConnection.close(1000, `connection closed`);
}

function addStatusMessage(msg) {
  const messageWrapper = chat.querySelector(`.message.message-status`).cloneNode(false);
  messageWrapper.innerHTML = `<span class="message-text">${msg}</span>`;
  messageContent.appendChild(messageWrapper);
}

function addIncomingMessage(msg) {
  const curDate = new Date();
  const messageWrapper = chat.querySelectorAll(`.message`)[1].cloneNode(false);
  messageWrapper.innerHTML = `<figure class="avatar"><img src="./i/profile-80.jpg" /></figure>
                              <span class="message-text">${msg}</span>
                              <div class="timestamp">${formatTime(curDate.getHours(), curDate.getMinutes())}</div>`;
  messageContent.appendChild(messageWrapper);
}

function addLoadingMessage() {
  const messageWrapper = chat.querySelector(`.message.loading`).cloneNode(false);
  messageWrapper.innerHTML = `<figure class="avatar"><img src="./i/profile-80.jpg" /></figure>
                              <span>Собеседник печатает...</span>`;
  console.log(`here`);
  messageContent.appendChild(messageWrapper);
}

function removeLoadingMessage() {
  if (messageContent.lastChild.classList.contains(`loading`))
    messageContent.removeChild(messageContent.lastChild);
}

function addOutgoingMessage(msg) {
  const curDate = new Date();
  const messageWrapper = chat.querySelector(`.message.message-personal`).cloneNode(false);
  messageWrapper.innerHTML = `<span class="message-text">${msg}</span>
                              <div class="timestamp">${formatTime(curDate.getHours(), curDate.getMinutes())}</div>`;
  wsConnection.send(msg);
  messageContent.appendChild(messageWrapper);
}

function formatTime(h, m) {
  const time = {};
  time.hours = h < 10 ? '0' + h : h;
  time.minutes = m < 10 ? '0' + m : m;
  return `${time.hours}:${time.minutes}`;
}

