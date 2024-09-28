const button = document.getElementById("select");
const date_picker = document.getElementById("time");
const output = document.getElementById("output");

button.addEventListener("click", () => {
    const date = date_picker.value
    const now = new Date();
    const birth = {
        year: Number(date.slice(0, 4)),
        month: Number(date.slice(5, 7)),
        day: Number(date.slice(8, 10)),
        hour: Number(date.slice(11, 13)),
        minute: Number(date.slice(14))
    };
    
    const age = now.getSeconds() + now.getMinutes()*60 + now.getHours()*3600 + now.getDate()*86400 + now.getMonth()*2629743.8328288 + now.getFullYear()*31556925.9939456 - birth.minute*60 - birth.hour*3600 - birth.day*86400 - birth.month*2629743.8328288 - birth.year*31556925.9939456;
    
    output.innerText = `you are: ${age}sec old.\nyou are: ${age/31556925.9939456}years old`
});