'use strict';

const longPoolingBlocks = document.querySelectorAll(`.long-pooling div`);

randomLongPoolingBlock();

function randomLongPoolingBlock() {
  fetch(`https://neto-api.herokuapp.com/comet/long-pooling`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      Array.from(longPoolingBlocks).map(resetBlocks);
      longPoolingBlocks[res - 1].classList.add(`flip-it`);
    })
    .then(randomLongPoolingBlock)
    .catch(er => console.log(er));
}