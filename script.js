const cardContent = document.querySelector(".cardContent");
const cardInputForm = document.querySelector(".cardInput");
const dateContainer = document.querySelector(".dateContainer");
const cardDate = document.getElementById("date-picker");
const dateSpans = document.querySelectorAll("span");
const resetBtn = document.querySelector(".resetBtn");
const timeContainer = document.querySelector(".timeContainer");
const againCalculateBtn = document.querySelector(".againCalculateBtn");

const currentDate = new Date().toISOString().split("T")[0];
let chosenDate = "";
let currentDateValue = new Date().getTime();
let timeInterval;
let localStorageItem;

cardDate.setAttribute("min", currentDate);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function updateTime() {
  const currentTime = new Date().getTime();
  const betweenTime = currentDateValue - currentTime;
  const days = Math.floor(betweenTime / day);
  const hours = Math.floor((betweenTime % day) / hour);
  const minutes = Math.floor((betweenTime % hour) / minute);
  const seconds = Math.floor((betweenTime % minute) / second);
  cardContent.hidden = true;
  if (betweenTime < 0) {
    dateContainer.hidden = true;
    clearInterval(timeInterval);
    timeContainer.hidden = false;
  } else {
    dateContainer.hidden = false;
    timeContainer.hidden = true;
    dateSpans[0].textContent = `${days}`;
    dateSpans[1].textContent = `${hours}`;
    dateSpans[2].textContent = `${minutes}`;
    dateSpans[3].textContent = `${seconds}`;
  }
}

function calculatedTime(e) {
  e.preventDefault();
  chosenDate = cardInputForm.date.value;

  localStorageItem = {
    date: chosenDate,
  };

  localStorage.setItem("time", JSON.stringify(localStorageItem));

  if (chosenDate == "") {
    alert("Lütfen bir tarih seçiniz.");
  } else {
    currentDateValue = new Date(chosenDate).getTime();
    timeInterval = setInterval(updateTime, 1000);
  }
}

function resetTime() {
  dateContainer.hidden = true;
  timeContainer.hidden = true;
  cardContent.hidden = false;
  clearInterval(timeInterval);
  localStorage.removeItem("time");
}

function refreshTime() {
    
  if (localStorage.getItem("time")) {
    localStorageItem = JSON.parse(localStorage.getItem("time"));
    chosenDate = localStorageItem.date;
    currentDateValue = new Date(chosenDate).getTime();
    cardContent.hidden = true;
    timeInterval = setInterval(updateTime, 1000);


    
  }
}

refreshTime();

cardInputForm.addEventListener("submit", calculatedTime);
resetBtn.addEventListener("click", resetTime);
againCalculateBtn.addEventListener("click", resetTime);
