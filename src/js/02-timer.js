import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    inputDate: document.querySelector('#datetime-picker'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
  };

  let timerId = null;
  refs.startBtn.disabled = true;
  refs.startBtn.addEventListener('click', onTimerStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      onSelectDate(selectedDates);
    },
  };

const fp = flatpickr("#datetime-picker", options);

function onSelectDate(selectedDates) {
  if (selectedDates[0] >= new Date()) {
    console.log("Выбрали дату");
    refs.startBtn.disabled = false;
  } else {
    refs.startBtn.disabled = true;
    // alert("Please choose a date in the future"); 
    Notify.failure('Please choose a date in the future', {
      width: '280px',
      position: 'left-top',
      distance: '10px',
    });
  }
}

  function onTimerStart() { 
    const selectedDate = fp.selectedDates[0];
    refs.inputDate.disabled = true;
    refs.startBtn.disabled = true;

    timerId = setInterval(() => {
      const currentDate = new Date();
      const timerValue = selectedDate - currentDate;

      const timeComponents = convertMs(timerValue)
        console.log(timeComponents)
      
        if (timerValue <= 0) {
        clearInterval(timerId);
        return;
      }
      showTimer(convertMs(timerValue));
    }, 1000);
  }


function pad(value) {
  return value.toString().padStart(2, 0);
}
  
  function showTimer({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = pad(days);
    refs.hoursEl.textContent = pad(hours);
    refs.minutesEl.textContent = pad(minutes);
    refs.secondsEl.textContent = pad(seconds);
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  