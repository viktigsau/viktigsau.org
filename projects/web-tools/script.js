fetch(`${window.location.origin}/projects/web-tools/info.json`)
.then(response => {
    if (!response.ok) {
        throw new Error("failed to fech.");
    };

    return response.json();
})
.then(data => {
    for (const lib of data.tools) {
        const tool = document.createElement("div");

        const name = document.createElement("h3");
        name.innerText = lib.name
        tool.appendChild(name);

        const link = document.createElement("p");
        link.innerText = `link: ${lib.url}`
        tool.appendChild(link);

        const description = document.createElement("p");
        description.innerText = lib.description;
        tool.appendChild(description);

        document.body.appendChild(tool);
    };
});