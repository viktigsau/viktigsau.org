fetch(`${window.location.origin}/projects/birthday-tools/info.json`)
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the response as JSON
    return response.json();
  })
  .then(data => {
    // Handle the JSON data
    const tools = data.tools;
    for (let i = 0; i < tools.length; i++) { 
        const tool = tools[i];
        
        const div = document.createElement("div");
        div.classList.add("tool");

        const link = document.createElement("a");
        link.href = tool.url
        link.classList.add("link")

        const name = document.createElement("h3")
        name.innerText = tool.name;
        name.classList.add("name");
        link.appendChild(name);

        div.appendChild(link);

        const description = document.createElement("p");
        description.innerText = tool.description
        description.classList.add("description")
        div.appendChild(description);
        
        document.body.appendChild(div);
    };
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });