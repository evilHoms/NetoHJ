'use strict';

const poolingBlocks = document.querySelectorAll(`.pooling div`);

setInterval(randomPoolingBlock, 5000);

function randomPoolingBlock() {
  fetch(`https://neto-api.herokuapp.com/comet/pooling`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      Array.from(poolingBlocks).map(resetBlocks);
      poolingBlocks[res - 1].classList.add(`flip-it`);
    })
    .catch(er => console.log(er));
}