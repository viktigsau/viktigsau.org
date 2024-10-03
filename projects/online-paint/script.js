function updatePixels() {
    const updateURL = "https://api.viktigsau.org/online-paint";

    fetch("https://jsonplaceholder.typicode.com/todos",{
        method: "POST",
        body: JSON.stringify({
            newPixels: drawing
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((response) => {
        if (response.ok) {
            response.json();
        };
    })
    .then((json) => {
        pixels = json.pixels;
        drawing = [];
    });
};

function draw(pixels) {
    //drawing logic
};

const refreshRateMS = 2000;

let pixels = []

let drawing = []

updatePixels([]);

setInterval(() => {
    console.log(pixels);
    updatePixels();
}, refreshRateMS);