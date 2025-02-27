// misc helper -----
/**
 * I stole this
 */
function shuffle(array: string[]) {
    // Iterate over the array in reverse order
    for (let i = array.length - 1; i > 0; i--) {

        // Generate Random Index
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function play_sound() {
    if (indicatorUp) return;

    indicatorElem!.style.display = "none";

    // a. don't move on to the next tone if they haven't guessed the current one
    // b. grab the next tone
    // c. because typescript
    current_tone = current_tone || remaing_tones.pop() || "";

    console.log(current_tone);
    
    let audio_file: HTMLAudioElement;
    try {
        audio_file = new Audio(`../../phreaking/sounds/${current_tone}.ogg`);
        audio_file.play();
    } catch (error) {
        console.log(error);
    }
}

function guess(button: string) {
    if (indicatorUp) return;
    if (current_tone == "") return; // guessed before listening to the tone

    if (button == current_tone) { // correct
        // update progress
        progress++;
        progressElem!.innerHTML = `Progress: ${progress}/${NUM_TONES}`;
        current_tone = "";

        // update indicator
        indicatorTextElem!.innerHTML = "&checkmark; Correct!";
        indicatorElem!.style.backgroundColor = "green";

        // update that button
        const buttonElem = document.getElementById(`${button}`) as HTMLButtonElement;
        if (buttonElem) {
            buttonElem.disabled = true;
        }

        // check done
        if (progress == NUM_TONES) done();
    }
    else { // incorrect
        // update incorrect
        incorrect++;
        incorrectElem!.innerHTML = `Incorrect guesses: ${incorrect}`;

        // update indicator
        indicatorTextElem!.innerHTML = "&cross; Incorrect!";
        indicatorElem!.style.backgroundColor = "red";
    }

    // update indicator after a guess
    indicatorElem!.style.display = "block";
    indicatorUp = true;

    indicatorProgressBar = 0;
    moveProgressBar();
}

function moveProgressBar() {
    if (indicatorProgressBar != 0) return;
    
    indicatorProgressBar = 1;
    let width = 1;
    progressBarID = setInterval(() => {
        if (width >= 100) {
            width = 0;
            closeIndicatorPopup();
        } else {
            width += 1000/indicatorTime; // because interval is every 10 milliseconds
            indicatorProgressBarElem!.style.width = width + "%";
        }
    }, 10);
}

function closeIndicatorPopup() {
    indicatorElem!.style.display = "none";
    indicatorUp = false;
    clearInterval(progressBarID);
}

function done() {
    // put on completion screen
    quizElem!.style.display = "none";

    completeElem!.innerHTML += `${incorrect}`;
    completeElem!.style.display = "block";
}

// set up tones -----
let tones: string[] = [];

// sf
for (let i = 0; i < 10; i++) {
    const id = `sf${i}`;
    tones.push(id);
}

// mf
for (let i = 0; i < 10; i++) {
    const id = `mf${i}`;
    tones.push(id);
}
tones.push("mfkp");
tones.push("mfst");

// dtmf
for (let i = 0; i < 10; i++) {
    const id = `dtmf${i}`;
    tones.push(id);
}
for (let c of "ABCD") {
    const id = `dtmf${c}`;
    tones.push(id);
}
tones.push("dtmfstar");
tones.push("dtmfpound");

// coins
tones.push("5cent");
tones.push("10cent");
tones.push("25cent");

// other
tones.push("2600hz");
tones.push("rf");

tones.forEach((tone) => 
    document.getElementById(tone)!.addEventListener("click", () => guess(tone))
);

const NUM_TONES = tones.length;

let remaing_tones = [...tones];
shuffle(remaing_tones);

let current_tone = "";

// grab elements -----
const quizElem = document.getElementById("main-quiz");

document.getElementById("play-sound")!.addEventListener("click", play_sound);

const completeElem = document.getElementById("complete");

// info
let progress = 0;
const progressElem = document.getElementById("progress");
progressElem!.innerHTML = `Progress: ${progress}/${NUM_TONES}`;

let incorrect = 0;
const incorrectElem = document.getElementById("incorrect");
incorrectElem!.innerHTML = `Incorrect guesses: ${incorrect}`;

// correct/incorrect indicator
const indicatorElem = document.getElementById("indicator");
const indicatorTextElem = document.getElementById("indicator-text");
document.getElementById("indicator-button")!.addEventListener("click", closeIndicatorPopup);
const indicatorProgressBarElem = document.getElementById("indicator-progress-bar");

const indicatorTime = 5000; // indicator shows up for 5000 milliseconds (or user can close the popup)
let indicatorProgressBar = 0;
let indicatorUp = false; // is the indicator showing
let progressBarID: number;
