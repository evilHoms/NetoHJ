'use strict'

const url = `https://neto-api.herokuapp.com/plane/`;
const acSelect = document.querySelector(`#acSelect`);
const seatMapTitle = document.querySelector(`#seatMapTitle`);
const btnSeatMap = document.querySelector(`#btnSeatMap`);
const btnSetFull = document.querySelector(`#btnSetFull`);
const btnSetEmpty = document.querySelector(`#btnSetEmpty`);

btnSetEmpty.setAttribute(`disabled`, true);
btnSetFull.setAttribute(`disabled`, true);

btnSeatMap.addEventListener(`click`, onBtnSeatMapClick);
btnSetEmpty.addEventListener(`click`, onBtnSetEmptyClick);
btnSetFull.addEventListener(`click`, onBtnSetFullClick);


function onBtnSeatMapClick(e) {
  e.preventDefault();
  btnSetEmpty.setAttribute(`disabled`, true);
  btnSetFull.setAttribute(`disabled`, true);
  setRequest(url + acSelect.value);
}

function onBtnSetFullClick(e) {
  e.preventDefault();
  const total = document.querySelectorAll(`.seat`);
  Array.from(total).forEach(el => {
    if (!e.altKey)
      el.classList.add(`adult`);
    else {
      el.classList.add(`half`);
    }
  });
  updateInfo();
}

function onBtnSetEmptyClick(e) {
  e.preventDefault();
  const total = document.querySelectorAll(`.seat`);
  Array.from(total).forEach(el => {
    el.classList.remove(`adult`);
    el.classList.remove(`half`);
  });
  updateInfo();
}

function setRequest(url) {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(res => handleData(res))
    .then(res => buildScheme(res))
    .then(res => handleSeats(res))
    .catch(er => console.log(er));
}

function handleData(res) {
  seatMapTitle.textContent = `${res.title} (${res.passengers} пассажиров)`;
  btnSetEmpty.removeAttribute(`disabled`);
  btnSetFull.removeAttribute(`disabled`);
  return res;
}

function handleSeats(map) {
  const total = map.querySelectorAll(`.seat`);
  updateInfo();
  
  Array.from(total).forEach(el => {
    el.addEventListener(`click`, onSeatClick);
  });
}

function onSeatClick(e) {
  
  if (this.classList.contains(`adult`) || this.classList.contains(`half`)) {
    this.classList.remove(`adult`);
    this.classList.remove(`half`);
  }
  else {
    if (e.altKey) {
      this.classList.add(`half`);
    }
    else {
      this.classList.add(`adult`);
    }
  }
  updateInfo();
}

function updateInfo() {
  const total = document.querySelectorAll(`.seat`);
  const adult = document.querySelectorAll(`.adult`);
  const half = document.querySelectorAll(`.half`);
  
  document.querySelector(`#totalPax`).textContent = total.length;
  document.querySelector(`#totalAdult`).textContent = adult.length;
  document.querySelector(`#totalHalf`).textContent = half.length;
}

function buildScheme(obj) {
  const seatMap = document.querySelector(`#seatMapDiv`);
  seatMap.textContent = ``;
  
  for(let i = 0; i < obj.scheme.length; i++) {
    seatMap.appendChild(buildRow(i + 1, obj.scheme[i]));
  }
  
  return seatMap;
}

function buildRow(rowNumber, numberOfSeats) {
  const row = document.createElement(`div`);
  row.className = `row seating-row text-center`;
  
  const seatGroupOne = document.createElement(`div`);
  seatGroupOne.className = `col-xs-5`;
  const seatGroupTwo = document.createElement(`div`);
  seatGroupTwo.className = `col-xs-5`;
  if (numberOfSeats === 4) {
    seatGroupOne.appendChild(buildSeat());
    seatGroupOne.appendChild(buildSeat(`B`));
    seatGroupOne.appendChild(buildSeat(`C`));
    seatGroupTwo.appendChild(buildSeat(`D`));
    seatGroupTwo.appendChild(buildSeat(`E`));
    seatGroupTwo.appendChild(buildSeat());
  }
  else if (numberOfSeats === 6) {
    seatGroupOne.appendChild(buildSeat(`A`));
    seatGroupOne.appendChild(buildSeat(`B`));
    seatGroupOne.appendChild(buildSeat(`C`));
    seatGroupTwo.appendChild(buildSeat(`D`));
    seatGroupTwo.appendChild(buildSeat(`E`));
    seatGroupTwo.appendChild(buildSeat(`F`));
  }
  else {
    seatGroupOne.appendChild(buildSeat());
    seatGroupOne.appendChild(buildSeat());
    seatGroupOne.appendChild(buildSeat());
    seatGroupTwo.appendChild(buildSeat());
    seatGroupTwo.appendChild(buildSeat());
    seatGroupTwo.appendChild(buildSeat());
  }
  
  row.appendChild(buildHeader(rowNumber));
  row.appendChild(seatGroupOne);
  row.appendChild(seatGroupTwo);
  
  
  return row;
  
  function buildHeader(rowNumber) {
    const headerWrapper = document.createElement(`div`);
    headerWrapper.className = `col-xs-1 row-number`;
    const header = document.createElement(`h2`);
    header.textContent = rowNumber;
    headerWrapper.appendChild(header);
    
    return headerWrapper;
  }
  
  function buildSeat(letter) {
    const seatWrapper = document.createElement(`div`);
    if (letter)
      seatWrapper.className = `col-xs-4 seat`;
    else
      seatWrapper.className = `col-xs-4 no-seat`;
    const seat = document.createElement(`span`);
    seat.className = `seat-label`;
    seat.textContent = letter;
    
    seatWrapper.appendChild(seat);
    return seatWrapper;
  }
}
//function buildPlainRow(rowNumber, isSeatArray) {
//  return {
//    tagName: `div`, className: `row seating-row text-center`,
//    content: [
//      {
//        tagName: `div`, className: `col-xs-1 row-number`,
//        content: {
//          tagName: `h2`, className: ``,
//          content: `1`
//        }
//      },
//      {
//        tagName: `div`, className: `col-xs-5`,
//        content: [
//          {
//            tagName: `div`, className: `col-xs-4 seat`,
//            content: {
//              tagName: `span`, className: `seat-label`,
//              content: `A`
//            }
//          },
//          {
//            tagName: `div`, className: `col-xs-4 seat`,
//            content: {
//              tagName: `span`, className: `seat-label`,
//              content: `B`
//            }
//          },
//          {
//            tagName: `div`, className: `col-xs-4 seat`,
//            content: {
//              tagName: `span`, className: `seat-label`,
//              content: `C`
//            }
//          }
//        ]
//      },
//      {
//        tagName: `div`, className: `col-xs-5`,
//        content: [
//          {
//            tagName: `div`, className: `col-xs-4 seat`,
//            content: {
//              tagName: `span`, className: `seat-label`,
//              content: `A`
//            }
//          },
//          {
//            tagName: `div`, className: `col-xs-4 seat`,
//            content: {
//              tagName: `span`, className: `seat-label`,
//              content: `B`
//            }
//          },
//          {
//            tagName: `div`, className: `col-xs-4 seat`,
//            content: {
//              tagName: `span`, className: `seat-label`,
//              content: `C`
//            }
//          }
//        ]
//      }
//    ]
//  };
//}