const keys = new Set();

document.addEventListener("keypress", (event) => {
    keys.add(event.key);
});

document.addEventListener("keyup", (event) => {
    keys.delete(event.key);
});

const FPS = 20;
const PFPS = 20;

let velocity_x = 0;
let velocity_y = 0;

let x = 0;
let y = 0;

let friction = 2;

let movement_force_x = 0;
let movement_force_y = 0;

const player = document.getElementById("player");

//visual frame
setInterval(() => {
    if (keys.has("w")) {
        movement_force_y = 10;
    }
    else if (keys.has("s")) {
        movement_force_y = -10;
    }
    else{
        movement_force_y = 0;
    }

    if (keys.has("a")) {
        movement_force_x = 10;
    }
    else if (keys.has("d")) {
        movement_force_x = -10;
    }
    else{
        movement_force_x = 0;
    }

    player.style.left = -x + "px";
    player.style.top = -y + "px";

    console.log(x, y);
}, 1000/FPS);

//physics frame
setInterval(() => {
    let accseleration_x = movement_force_x;
    let accseleration_y = movement_force_y;

    velocity_x += accseleration_x;
    velocity_y += accseleration_y;
    
    x += velocity_x;
    y += velocity_y;

    velocity_x /= friction;
    velocity_y /= friction;
}, 1000/PFPS);