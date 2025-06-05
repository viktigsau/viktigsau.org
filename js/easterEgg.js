let lastAction = 0;

document.addEventListener("mousemove", (event) => {
    lastAction = 0;
});
document.addEventListener("mousedown", (event) => {
    lastAction = 0;
});
document.addEventListener("mouseup", (event) => {
    lastAction = 0;
});
document.addEventListener("keydown", (event) => {
    lastAction = 0;
});
document.addEventListener("keyup", (event) => {
    lastAction = 0;
});

let isIdle = false;
let playing = false;

setInterval(() => {
    lastAction += 1;
    if (lastAction >= 3600 && !playing) {
        isIdle = true;
        playing = true;
        idle();
    };
    if (lastAction <= 1) {
        isIdle = false;
    };
}, 1000)

function idle() {
    const dialoge = [
        "Hello?",
        "anyone here?",
        "HELLO!?",
        "guess im alone",
        "damit",
    ];

    const sheep = document.createElement("div");

    sheep.style.position = "fixed";

    sheep.style.backgroundColor = "#ff000090";

    sheep.style.width = "100px";
    sheep.style.height = "100px";

    sheep.style.top = "100px";
    sheep.style.left = "100px";

    const img = document.createElement("img");

    img.src = "sprites/badSheep.png";
    img.style.width = "100%";
    img.style.height = "100%";

    img.style.imageRendering = 'pixelated';

    sheep.append(img);

    const speachBubble = document.createElement("div");

    speachBubble.classList.add("speach-bubble");

    sheep.appendChild(speachBubble);

    document.body.appendChild(sheep);

    const delaySeconds = 3;

    let totalDelaySeconds = 0;
    dialoge.forEach((line) => {
        setTimeout(() => {
            if (isIdle) {
                speachBubble.innerText = line;
            }else{
                speachBubble.innerText = "oh. there you are.";
                sheep.classList.add("fade-out");
                setTimeout(() => {
                    sheep.remove()
                    playing = false;
                }, 2000);
            };
        }, totalDelaySeconds*1000);
        totalDelaySeconds += delaySeconds;
    });

    setTimeout(() => {
        sheep.classList.add("fade-out");
        setTimeout(() => {
            sheep.remove()
            playing = false;
            lastAction = 0;
        }, 2000);
    }, totalDelaySeconds*1000);
};
