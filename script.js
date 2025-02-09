let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isRunning = false;
let isWorkTime = true;
let timer;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');
const addTimeButton = document.getElementById('add-time');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Format the time strings
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    
    // Update the display
    minutesDisplay.textContent = minutesStr;
    secondsDisplay.textContent = secondsStr;
    
    // Update the page title
    const timeString = `${minutesStr}:${secondsStr}`;
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = `${timeString} - ${mode} - Pomodoro`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Rest' : 'Switch to Work';
    modeToggleButton.className = isWorkTime ? 'work-mode' : 'rest-mode';
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        if (isWorkTime) {
            const task = prompt("What are you working on this session?");
            if (task) {
                const taskDisplay = document.getElementById('current-task');
                taskDisplay.textContent = `Current Task: ${task}`;
                
                isRunning = true;
                startButton.textContent = 'Pause';
                
                timer = setInterval(() => {
                    timeLeft--;
                    updateDisplay();
                    
                    if (timeLeft === 0) {
                        switchMode();
                    }
                }, 1000);
            }
        } else {
            // For break time, start immediately
            isRunning = true;
            startButton.textContent = 'Pause';
            
            timer = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft === 0) {
                    switchMode();
                }
            }, 1000);
        }
    } else {
        isRunning = false;
        startButton.textContent = 'Start';
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    isWorkTime = true;
    timeLeft = workTime;
    startButton.textContent = 'Start';
    statusText.textContent = 'Work Time';
    modeToggleButton.textContent = 'Switch to Break';
    modeToggleButton.className = 'work-mode';
    document.getElementById('current-task').textContent = '';
    updateDisplay();
}

// Initialize
timeLeft = workTime;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', () => {
    if (!isRunning) {
        switchMode();
    } else {
        return;
    }
});

addTimeButton.addEventListener('click', () => {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
});

// Add this line to initialize the button's color class
modeToggleButton.className = 'work-mode'; 