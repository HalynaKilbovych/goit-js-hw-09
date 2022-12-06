
refs = { 
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
};

let timerId = null;

refs.startBtn.addEventListener('click', onstartChangeColor); 
refs.stopBtn.addEventListener('click', onstopChangeColor);

function onstartChangeColor() { 
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();;
      }, 1000);
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false;
};

function onstopChangeColor() { 
    clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped!`);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

