const notesElement = document.getElementById("note-bar");
const keysElement = document.getElementById("keys");

const sortedNotes = notes.sort((a, b) => {
    const a_octav = Number(a[a.length-1])-1;
    const a_key = "gabcdef".indexOf(a[0]);
    let a_index = a_octav*8+a_key;
    if (a[1] == "-") {a_index+=1};

    const b_octav = Number(b[b.length-1])-1;
    const b_key = "gabcdef".indexOf(b[0]);
    let b_index = b_octav*8+b_key;
    if (b[1] == "-") {b_index+=0.5};

    return a_index-b_index;
});

for (const note of sortedNotes) {
    const key = document.createElement("div");

    if (note.includes("-")) {
        key.classList.add("key-black");
    }else{
        key.classList.add("key-white");
    };

    key.innerText = note;

    key.id = `key-${note}`;

    keysElement.appendChild(key);
};