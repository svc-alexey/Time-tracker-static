'use strict';
// активировать All или Fovarite
$('.sorting').click(function () {
  $('.sorting').toggleClass('sorting-active', false);
  $(this).toggleClass('sorting-active');
});
// открыть вложенный список задач
$('.issue__time-amount').click(function () {
  $('.two').toggle();
  $('#shevron').toggle();
  $('.issue__open').toggle();
});
// включаем switch google calendar sync
$('.switch').click(function () {
  $('.switch').toggleClass('switch-active');
  $('.sync__issues').toggle();
});
// открыть бургер time tracking
$('.tracking__burger').click(function () {
  $('.tracking__burger-menu').toggle();
});

// открыть календарь
$('.data').click(function () {
  $('.calendar').toggle();
});

//открыть таймер
$('.append__worklog').click(function () {
  $('.new__worklog__wrapper').toggle();
  $('.stopwatch__wrapper').toggle();
});

// worklog range time
$('.stopwatch__button-stop').click(function () {
  $('.show__worklog').toggle();
});
$('.new__worklog__button-decline').click(function () {
  $('.show__worklog').toggle();
  $('.stopwatch__wrapper').toggle();
  $('.new__worklog__wrapper').toggle();
});

// -------------------- calendar
// ---- Добавить рандомные стили в спан -----
$(document).ready(function () {
  let classes = ['missed', 'done', 'inprogress'];
  $('.day>span').each(function (i) {
    $(this).addClass(classes[Math.floor(Math.random() * classes.length)]);
  });
});

// ----- Calandar set date -----
const calendarDate = () => {
  const date = new Date();
  date.setDate(1); //задать дату с 1 числа
  const monthDays = document.querySelector('.calendar__days');
  const month = date.getMonth();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate(); // сколько дней в месяце
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0,
  ).getDate(); // сколько дней в предидущем месяце
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDay(); // индекс последнего дня месяца
  const nextDays = 7 - lastDayIndex - 1; // сколько нужно дней следующего месяца
  const firstDayIndex = date.getDay(); // индекс первого дня месяца
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  document.querySelector('.calendar__date p').innerHTML =
    months[date.getMonth()];
  let days = '';
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class='day prev-days'>${
      prevLastDay - x + 1
    }<span></span></div>`;
  }
  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth(0)
    ) {
      days += `<div class='day today-calendar'>${i}<span></span></div>`;
      monthDays.innerHTML = days;
    } else {
      days += `<div class='day'>${i}<span></span></div>`;
      monthDays.innerHTML = days;
    }
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class='day next-date '>${j}<span></span></div>`;
    monthDays.innerHTML = days;
  }
};
calendarDate();
// ----- /Calandar set date -----

// ----- Активная задача
let button = document.querySelectorAll('.timer__button');
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', function (e) {
    button[i].classList.toggle('timer-pause');
    let icon = document.querySelectorAll('.timer__icon');
    icon[i].classList.toggle('hidden');
    let panel = document.querySelectorAll('.active__bar');
    panel[i].classList.toggle('active__bar-show');
    let item = document.querySelectorAll('.issue__items');
    item[i].classList.toggle('active');
  });
}

// открыть бургер активной задачи
let burger = document.querySelectorAll('.active__bar-burger');
for (let i = 0; i < button.length; i++) {
  burger[i].addEventListener('click', function (e) {
    let item = document.querySelectorAll('.active__bar-menu');
    item[i].classList.toggle('menu-show');
  });
}

// ----Slider input----

function init2slider() {
  let slider = document.querySelector('.range__slider');
  let between = document.querySelector('.track');
  let button1 = document.querySelector('.thumb-1');
  let button2 = document.querySelector('.thumb-2');
  let inpt1 = document.querySelector('.range__input-1');
  let inpt2 = document.querySelector('.range__input-2');

  let min = inpt1.min;
  let max = inpt1.max;

  /*init*/
  let sliderCoords = getCoords(slider);
  button1.style.marginLeft = '0px';
  button2.style.marginLeft = slider.offsetWidth - button1.offsetWidth + 'px';
  between.style.width = slider.offsetWidth - button1.offsetWidth + 'px';
  inpt1.value = min;
  inpt2.value = max;

  /*mouse*/
  button1.onmousedown = function (e) {
    let sliderCoords = getCoords(slider);
    let betweenCoords = getCoords(between);
    let buttonCoords1 = getCoords(button1);
    let buttonCoords2 = getCoords(button2);
    let shiftX2 = e.pageX - buttonCoords2.left;
    let shiftX1 = e.pageX - buttonCoords1.left;

    document.onmousemove = function (e) {
      let left1 = e.pageX - shiftX1 - sliderCoords.left;
      let right1 = slider.offsetWidth - button1.offsetWidth;
      if (left1 < 0) left1 = 0;
      if (left1 > right1) left1 = right1;
      button1.style.marginLeft = left1 + 'px';

      shiftX2 = e.pageX - buttonCoords2.left;
      let left2 = e.pageX - shiftX2 - sliderCoords.left;
      let right2 = slider.offsetWidth - button2.offsetWidth;
      if (left2 < 0) left2 = 0;
      if (left2 > right2) left2 = right2;

      let per_min = 0;
      let per_max = 0;
      if (left1 > left2) {
        between.style.width = left1 - left2 + 'px';
        between.style.marginLeft = left2 + 'px';

        per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
      } else {
        between.style.width = left2 - left1 + 'px';
        between.style.marginLeft = left1 + 'px';

        per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
      }
      inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
      inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  button2.onmousedown = function (e) {
    let sliderCoords = getCoords(slider);
    let betweenCoords = getCoords(between);
    let buttonCoords1 = getCoords(button1);
    let buttonCoords2 = getCoords(button2);
    let shiftX2 = e.pageX - buttonCoords2.left;
    let shiftX1 = e.pageX - buttonCoords1.left;

    document.onmousemove = function (e) {
      let left2 = e.pageX - shiftX2 - sliderCoords.left;
      let right2 = slider.offsetWidth - button2.offsetWidth;
      if (left2 < 0) left2 = 0;
      if (left2 > right2) left2 = right2;
      button2.style.marginLeft = left2 + 'px';

      shiftX1 = e.pageX - buttonCoords1.left;
      let left1 = e.pageX - shiftX1 - sliderCoords.left;
      let right1 = slider.offsetWidth - button1.offsetWidth;
      if (left1 < 0) left1 = 0;
      if (left1 > right1) left1 = right1;

      let per_min = 0;
      let per_max = 0;

      if (left1 > left2) {
        between.style.width = left1 - left2 + 'px';
        between.style.marginLeft = left2 + 'px';
        per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
      } else {
        between.style.width = left2 - left1 + 'px';
        between.style.marginLeft = left1 + 'px';
        per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
      }
      inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
      inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  button1.addEventListener('ondragstart', function (e) {
    preventDefault();
  });
  button2.addEventListener('ondragstart', function (e) {
    preventDefault();
  });

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
}

init2slider();
// ----Slider input----
