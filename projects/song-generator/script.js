const notes = [];

const musicalKeys = {
    'c major': ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4'],
    'c minor': ['c4', 'd4', 'e-4', 'f4', 'g4', 'a-4', 'b-4'],

    'c- major': ['c-4', 'd-4', 'e-4', 'f-4', 'g-4', 'a-4', 'b-4'],
    'c- minor': ['c-4', 'd-4', 'e4', 'f-4', 'g-4', 'a4', 'b4'],

    'd major': ['d4', 'e4', 'f-4', 'g4', 'a4', 'b4', 'c-5'],
    'd minor': ['d4', 'e4', 'f4', 'g4', 'a4', 'b-4', 'c4'],

    'd- major': ['d-4', 'e-4', 'f-4', 'g-4', 'a-4', 'b-4', 'c-5'],
    'd- minor': ['d-4', 'e-4', 'f-4', 'g-4', 'a-4', 'b4', 'c-5'],

    'e major': ['e4', 'f-4', 'g-4', 'a4', 'b4', 'c-5', 'd-5'],
    'e minor': ['e3', 'f-3', 'g3', 'a3', 'b3', 'c3', 'd3', 'e4', 'f-4', 'g4', 'a4', 'b4', 'c4', 'd4', 'e5', 'f-5', 'g5', 'a5', 'b5', 'c5', 'd5'],

    'f major': ['f4', 'g4', 'a4', 'b-4', 'c5', 'd5', 'e5'],
    'f minor': ['f4', 'g4', 'a-4', 'b-4', 'c5', 'd-4', 'e-4'],

    'f- major': ['f-4', 'g-4', 'a-4', 'b4', 'c5', 'd-5', 'e-5'],
    'f- minor': ['f-4', 'g-4', 'a4', 'b4', 'c5', 'd4', 'e4'],

    'g major': ['g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f-5'],
    'g minor': ['g4', 'a4', 'b-4', 'c5', 'd5', 'e-4', 'f4'],

    'g- major': ['g-4', 'a-4', 'b-4', 'c-5', 'd-5', 'e-5', 'f-5'],
    'g- minor': ['g-4', 'a-4', 'b4', 'c-5', 'd-5', 'e4', 'f-5'],

    'a major': ['a4', 'b4', 'c-5', 'd5', 'e5', 'f-5', 'g-5'],
    'a minor': ['a4', 'b4', 'c4', 'd5', 'e5', 'f5', 'g5'],

    'a- major': ['a-4', 'b-4', 'c-5', 'd-5', 'e-5', 'f-5', 'g-5'],
    'a- minor': ['a-4', 'b-4', 'c5', 'd-5', 'e-5', 'f-5', 'g-5'],

    'b major': ['b4', 'c-5', 'd-5', 'e5', 'f-5', 'g-5', 'a-5'],
    'b minor': ['b4', 'c-5', 'd4', 'e5', 'f-5', 'g5', 'a4']
};

const letters = "gabcdef";
const numbers = "345";

for (const letter of letters) {
    for (const number of numbers) {
        notes.push(`${letter}${number}`);

        if (!["b", "e"].includes(letter) && !(letter == "a" && number == "5")) {
            notes.push(`${letter}-${number}`);
        };
    };
};

for (const note of notes) {
    const audioElement = document.createElement("audio");

    audioElement.src = `notes/${note}.mp3`

    audioElement.id = note;

    document.getElementById("notes").appendChild(audioElement);
};

function generatePerlinNoise(l, scale = 0.1) {
    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    function lerp(a, b, t) {
        return a + t * (b - a);
    }

    function grad(hash, x) {
        const h = hash & 3; // Convert low 2 bits of hash code
        return (h === 0 ? x : (h === 1 ? -x : (h === 2 ? 1 : -1))); // Random gradient direction
    }

    // Create a permutation array
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
        p[i] = Math.floor(Math.random() * 256);
    }

    const noiseValues = [];
    
    for (let i = 0; i < l; i++) {
        let x = i * scale;
        const X = Math.floor(x) & 255; // Get the integer part of x
        x -= Math.floor(x); // Keep the fractional part
        const u = fade(x); // Fade the fractional part

        // Hash the two surrounding points
        const a = p[X];
        const b = p[(X + 1) & 255];

        // Combine the gradients and interpolate
        let noise = lerp(grad(a, x), grad(b, x - 1), u);

        // Scale to [0, 1]
        noise = (noise + 1) / 2; // Normalize to [0, 1]
        
        noiseValues.push(noise);
    }

    return noiseValues;
}

function generateSong(length, noteSet=notes) {
    //const noise = generatePerlinNoise(length, 0.5);
    //const song = [];
    //for (const step of noise) {
    //    const index = Math.floor(step*(noteSet.length-1))
    //    song.push(noteSet[index]);
    //};
    //return song;
    const song = [];
    let pointer = 0;
    for (let i = 0; i < length; i++) {
        pointer += 1-Math.floor(Math.random()*3);
        song.push(noteSet[(pointer%noteSet.length)]);
    };
    console.table(song);
    return song;
};

function playNotes(noteList) {
    const noteElement = document.getElementById("note-bar")
    let delay = 0;
    let i = 0;
    noteList.forEach(note => {
        const noteBlock = document.createElement("div");
        
        noteBlock.classList.add("note-block");
        noteBlock.id = `note-block.${note}`;
        if (note.includes("-")) {
            noteBlock.style.width = "25px";
        };

        const keyElement = document.getElementById(`key-${note}`);

        noteBlock.style.left = keyElement.getBoundingClientRect().left + "px";
        noteBlock.style.top = -i*50+noteElement.getBoundingClientRect().bottom+"px";

        setInterval(() => {
            noteBlock.style.top = noteBlock.offsetTop+45 + "px";
        }, 1000)

        noteElement.appendChild(noteBlock);

        const audioElement = document.getElementById(note);
        if (audioElement) {
            setTimeout(() => {
                audioElement.currentTime = 0;
                audioElement.play();
                keyElement.classList.add("presed");
                setTimeout(() => {keyElement.classList.remove("presed")}, 900);
            }, delay * 1000);
            delay += 1;
        };
        i += 1;
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const song = generateSong(100, sortedNotes);

    let playing = false;

    document.addEventListener("click", () => {
        if (!playing) {
            playNotes(song);
            playing = true
        };
    });
});