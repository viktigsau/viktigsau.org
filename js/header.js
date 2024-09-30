const vw = window.visualViewport.width

if (vw < 500) {
    document.getElementById("slogan").style.fontSize = "small"
};

const header = document.getElementsByTagName("header")[0];

header.addEventListener("click", () => {
    window.location = "/";
});