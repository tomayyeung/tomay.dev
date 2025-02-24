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

    current_tone = current_tone || remaing_tones.pop() || "";

    console.log(current_tone);
    
    let audio_file: HTMLAudioElement;
    try {
        audio_file = new Audio(`./sounds/${current_tone}.ogg`);
        audio_file.play();
    } catch (error) {
        console.log(error);
    };
}

function guess(button: string) {
    if (indicatorUp) return;

    if (button == current_tone) {
        // update progress
        progress++;
        progressElem!.innerHTML = `Progress: ${progress}/${NUM_TONES}`;
        current_tone = "";

        // update indicator
        indicatorTextElem!.innerHTML = "&checkmark; Correct!";
        indicatorElem!.style.backgroundColor = "green";
        // indicatorTextElem!.style.color = "green";
        // indicatorElem!.style.borderColor = "green";
        indicatorElem!.style.display = "block";
        indicatorUp = true;

        // update button
        const buttonElem = document.getElementById(`${button}`) as HTMLButtonElement;
        if (buttonElem) {
            buttonElem.disabled = true;
        }

        // check done
        if (progress == NUM_TONES) done();
    } else {
        if (current_tone == "") return; // guessed before listening to the tone

        // update incorrect
        incorrect++;
        incorrectElem!.innerHTML = `Incorrect guesses: ${incorrect}`;

        // update indicator
        indicatorTextElem!.innerHTML = "&cross; Incorrect!";
        indicatorElem!.style.backgroundColor = "red";
        // indicatorTextElem!.style.color = "red";
        // indicatorElem!.style.borderColor = "red";
        indicatorElem!.style.display = "block";
        indicatorUp = true;
    }
}

function closeIndicatorPopup() {
    indicatorElem!.style.display = "none";
    indicatorUp = false;
}

function done() {
    // put on completion screen
    quizElem!.style.display = "none";

    const completeElem = document.getElementById("complete");
    completeElem!.innerHTML += `${incorrect}`;
    completeElem!.style.display = "block";
}

// set up tones
let tones: string[] = [];

// sf
for (let i = 0; i < 10; i++) {
    let id = `sf${i}`;
    tones.push(id);
    document.getElementById(id)!.addEventListener("click", () => guess(id));
}

// mf
for (let i = 0; i < 10; i++) {
    let id = `mf${i}`;
    tones.push(id);
    document.getElementById(id)!.addEventListener("click", () => guess(id));
}
tones.push("mfkp");
document.getElementById("mfkp")!.addEventListener("click", () => guess("mfkp"));
tones.push("mfst");
document.getElementById("mfst")!.addEventListener("click", () => guess("mfst"));

// dtmf
for (let i = 0; i < 10; i++) {
    let id = `dtmf${i}`;
    tones.push(id);
    document.getElementById(id)!.addEventListener("click", () => guess(id));
}
for (let c of "ABCD") {
    let id = `dtmf${c}`;
    tones.push(id);
    document.getElementById(id)!.addEventListener("click", () => guess(id));
}
tones.push("dtmfstar");
document.getElementById("dtmfstar")!.addEventListener("click", () => guess("dtmfstar"));
tones.push("dtmfpound");
document.getElementById("dtmfpound")!.addEventListener("click", () => guess("dtmfpound"));

// other
tones.push("2600hz");
document.getElementById("2600hz")!.addEventListener("click", () => guess("2600hz"));
tones.push("rf");
document.getElementById("rf")!.addEventListener("click", () => guess("rf"));

const NUM_TONES = tones.length;

let remaing_tones = [...tones];
shuffle(remaing_tones);

let current_tone = "";

const quizElem = document.getElementById("main-quiz");

document.getElementById("play-sound")!.addEventListener("click", play_sound);

let progress = 0;
const progressElem = document.getElementById("progress");
progressElem!.innerHTML = `Progress: ${progress}/${NUM_TONES}`;

let incorrect = 0;
const incorrectElem = document.getElementById("incorrect");
incorrectElem!.innerHTML = `Incorrect guesses: ${incorrect}`;

const indicatorElem = document.getElementById("indicator");
const indicatorTextElem = document.getElementById("indicator-text");
document.getElementById("indicator-button")!.addEventListener("click", closeIndicatorPopup);

let indicatorUp = false;