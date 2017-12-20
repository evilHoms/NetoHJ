'use strict';

const takePhoto = document.querySelector(`#take-photo`);
const errorMessage = document.querySelector(`#error-message`);
const list = document.querySelector(`.list`);
const controls = document.querySelector(`.controls`);
const main = document.querySelector(`.app`);
let video = null;
let blob = null;
let base64 = null;

if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
      makeControlsVisible();
      video = createVideo(URL.createObjectURL(stream));

      const audio = createAudio();
      const canvas = document.createElement(`canvas`);
      const ctx = canvas.getContext('2d');
      takePhoto.addEventListener(`click`, onTakePhotoClick);

      function onTakePhotoClick(e) {
        audio.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob1) => {blob = blob1});
        base64 = canvas.toDataURL();
        createImage(base64);
      }
    })
    .catch(er => {
      errorMessage.classList.add(`visible`);
      errorMessage.textContent = `В доступе к камере отказано`;
    });
}
else {
  errorMessage.classList.add(`visible`);
  errorMessage.textContent = `Отсутствует возможность просмотра видео с веб камеры`;
}




function createVideo(src) {
  const video = document.createElement('video');
  video.src = src;
  main.appendChild(video);
  return video;
}

function createAudio() {
  const audio = document.createElement(`audio`);
  audio.src = `./audio/click.mp3`;
  main.appendChild(audio);
  return audio;
}

function createImage(src) {
  const img = document.createElement(`figure`);
  img.innerHTML = `
    <img src="${src}">
    <figcaption>
      <a href="${src}" download="snapshot.png">
        <i class="material-icons">file_download</i>
      </a>
      <a><i class="material-icons">file_upload</i></a>
      <a><i class="material-icons">delete</i></a>
    </figcaption>
  `
  list.appendChild(img);
  img.addEventListener(`click`, onImgClick);
  
  function onImgClick(e) {
    if (e.target.textContent === `file_upload`) {
      const formData = new FormData();
      console.log(blob);
      formData.append('image', blob);
      
      fetch(`https://neto-api.herokuapp.com/photo-booth`, {
        method: 'POST',
        body: formData
      })
        .then(res => {
          console.log(res.url);
        })
        .catch(er => console.log(er));
    }
    else if (e.target.textContent === `delete`) {
      list.removeChild(this);
    }
  }
}

function requestAccess() {
  return navigator.mediaDevices.getUserMedia({video: true, audio: false});
}

function makeControlsVisible(makeVisible = true) {
  console.log(controls);
  makeVisible ? controls.classList.add(`visible`) : controls.classList.remove(`visible`);
}
