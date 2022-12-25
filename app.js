// Makes the program wait specified milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Creates a div with class .bar with height as the given value and append the div to the container
function createBar(height) {
  const div = document.createElement("div");
  div.style.height = `${height}%`;
  div.classList.add("bar");
  container.appendChild(div);
}

// Returns a array of specified size with random values
function createArr(size) {
  const arr = [];
  for (let i = 0; i < size; i++) arr.push(Math.floor(Math.random() * 100) + 1);
  return arr;
}

// Create/Update bars in the visualiser
function generateVisualiser(arr) {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }

  arr.forEach((elem) => {
    createBar(elem);
  });
}

// Bubble sorts the elements
async function bubbleSort(arr) {
  const bars = document.getElementsByClassName("bar");
  isRunning = true;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (!isRunning) return;

      bars[j].classList.add("active");
      bars[j + 1].classList.add("active");

      if (parseInt(bars[j].style.height.replace("%", "")) > parseInt(bars[j + 1].style.height.replace("%", ""))) {
        let temp = bars[j].style.height;
        bars[j].style.height = bars[j + 1].style.height;
        bars[j + 1].style.height = temp;
      }

      await sleep(speedRange.value);
      bars[j].classList.remove("active");
      bars[j + 1].classList.remove("active");
    }
  }

  isRunning = false;
}

/* __MAIN__ */
// Range Inputs
const noOfElemsRange = document.getElementById("no-of-elems");
const speedRange = document.getElementById("sorting-speed");
console.log(speedRange.value);

// UI Elements
const bubbleSortBtn = document.getElementById("sorting-btn");
const randomizeButton = document.getElementById("randomize-btn");
const container = document.getElementById("visualiser");

// Variable that will help to terminate the sorting in middle
let isRunning = false;

// Initial Visual
let arr = createArr(noOfElemsRange.value);
generateVisualiser(arr);

// Randomize Button onclick
randomizeButton.onclick = () => {
  isRunning = false;
  arr = createArr(noOfElemsRange.value);
  generateVisualiser(arr);
};

// BubbleSort/Evaluate Button onclick
bubbleSortBtn.onclick = () => {
  bubbleSort(arr);
};

// Range value change handle
noOfElemsRange.onchange = () => {
  isRunning = false;
  arr = createArr(noOfElemsRange.value);
  generateVisualiser(arr);
};
