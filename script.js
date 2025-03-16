const reminders = [
    "Bananas are berries, but strawberries aren't.",
    "A shrimp's heart is in its head.",
    "Wombat poop is cube-shaped!",
    "Your skeleton is wet right now.",
    "Sharks existed before trees.",
    "Sloths can hold their breath longer than dolphins!",
    "The Cookie Monster’s real name is Sid.",
    "Octopuses have three hearts!",
    "The unicorn is Scotland’s national animal.",
    "A day on Venus is longer than a year on Venus!"
];

const funnySounds = [
    "https://www.myinstants.com/media/sounds/oh-no-no-no-no-laugh.mp3",
    "https://www.myinstants.com/media/sounds/dramatic-chipmunk.mp3",
    "https://www.myinstants.com/media/sounds/bruh.mp3",
    "https://www.myinstants.com/media/sounds/vine-boom.mp3",
    "https://www.myinstants.com/media/sounds/sad-violin.mp3"

];

const reminderText = document.getElementById("reminder-text");
const dismissButton = document.getElementById("dismiss-btn");
const reminderContainer = document.querySelector(".reminder-section");
const moreButton = document.createElement("button");
moreButton.textContent = "More Reminders";
moreButton.style.display = "block";
moreButton.style.marginTop = "10px";
reminderContainer.appendChild(moreButton);

let audio = new Audio();

function newReminder() {
    const randomIndex = Math.floor(Math.random() * reminders.length);
    reminderText.textContent = reminders[randomIndex];
    
    playRandomSound();
    moveButton();

    if (Math.random() < 0.5) {
        alert("New Useless Reminder: " + reminders[randomIndex]);
    }
}

function playRandomSound() {
    const soundIndex = Math.floor(Math.random() * funnySounds.length);
    audio.src = funnySounds[soundIndex];
    audio.play();
}

function moveButton() {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    dismissButton.style.position = "absolute";
    dismissButton.style.left = `${x}px`;
    dismissButton.style.top = `${y}px`;
}

function setUserReminder(reminderInput, reminderTime) {
    const userTime = new Date(reminderTime.value);
    const currentTime = new Date();

    if (isNaN(userTime)) {
        alert("Please enter a valid date and time.");
        return;
    }

    if (userTime < currentTime) {
        alert("You can't set a reminder in the past, genius.");
        return;
    }

    const delay = userTime - currentTime;
    setTimeout(() => {
        newReminder();
        alert("Here's your totally *real* reminder: " + reminderText.textContent);
    }, delay);
}

function addReminderInput() {
    const reminderDiv = document.createElement("div");
    reminderDiv.innerHTML = `
        <input type="text" placeholder="Enter reminder" class="user-reminder">
        <input type="datetime-local" class="reminder-time">
        <button class="set-reminder-btn">Set Reminder</button>
    `;
    reminderContainer.insertBefore(reminderDiv, moreButton);
    
    const reminderInput = reminderDiv.querySelector(".user-reminder");
    const reminderTime = reminderDiv.querySelector(".reminder-time");
    const setReminderBtn = reminderDiv.querySelector(".set-reminder-btn");
    
    setReminderBtn.addEventListener("click", () => setUserReminder(reminderInput, reminderTime));
}

for (let i = 0; i < 5; i++) {
    addReminderInput();
}

moreButton.addEventListener("click", addReminderInput);
dismissButton.addEventListener("click", newReminder);
dismissButton.addEventListener("mouseover", moveButton);
setInterval(newReminder, 10000);
setInterval(() => {
    document.body.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
}, 5000);


