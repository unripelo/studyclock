let timer;
let isRunning = false;
let timeLeft;
let currentMode = "work";

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const workBtn = document.getElementById("work-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = "Start";
    return;
  }

  isRunning = true;
  startBtn.textContent = "Pause";

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      startBtn.textContent = "Start";
      alert("Time is up!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "Start";
  setMode(currentMode);
}

function setMode(mode) {
  currentMode = mode;

  // Update styling
  [workBtn, shortBreakBtn, longBreakBtn].forEach((btn) =>
    btn.classList.remove("active"),
  );
  if (mode === "work") workBtn.classList.add("active");
  else if (mode === "short-break") shortBreakBtn.classList.add("active");
  else if (mode === "long-break") longBreakBtn.classList.add("active");

  // Set time
  if (mode === "work") timeLeft = WORK_TIME;
  else if (mode === "short-break") timeLeft = SHORT_BREAK_TIME;
  else if (mode === "long-break") timeLeft = LONG_BREAK_TIME;

  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

workBtn.addEventListener("click", () => {
  setMode("work");
  if (isRunning) resetTimer(); // Stop if switching modes
});

shortBreakBtn.addEventListener("click", () => {
  setMode("short-break");
  if (isRunning) resetTimer();
});

longBreakBtn.addEventListener("click", () => {
  setMode("long-break");
  if (isRunning) resetTimer();
});

// Initialize
setMode("work");
