'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app, config, limit) {
  return new Promise((done, fail) => {
    let recorder = null;
    let recorded = null;
    let image = null;
    let stream = null;
    app.mode = 'preparing';
    
    navigator.mediaDevices
      .getUserMedia({video: true, audio: false})
      .then(str => {
        setTimeout(() => {
          stream = str;
          app.mode = 'recording';
          app.preview.srcObject = stream;
          recorder = new MediaRecorder(stream);
          let chunks = [];
          recorder.start();
          
          recorder.addEventListener('dataavailable', e => chunks.push(e.data));
      
          recorder.addEventListener('stop', e => {
            recorded = new Blob(chunks, { 'type': recorder.mimeType });
            createThumbnail(recorded)
              .then(res => {
                image = res;
                console.log(recorded, image);
                done({
                  video: recorded,
                  frame: image
                });
              })
              .catch(er => fail(er));
            chunks = null;
            recorder = stream = null;
          });
        }, 1000);
      })
      .then(() => {
        setTimeout(() => {
          app.mode = 'sending';
          app.preview.srcObject = null;
          recorder.stop();
          stream.getVideoTracks().map(track => track.stop());
        }, limit);
      })
      .catch(er => fail(er));
  });
}
