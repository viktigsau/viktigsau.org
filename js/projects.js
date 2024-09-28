fetch('https://viktigsau.org/projects/info.json')
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
    const projects = data.projects;
    const holder = document.getElementById("projects_holder");
    for (let i = 0; i < projects.length; i++) { 
        const project = projects[i];
        
        const project_div = document.createElement("div");
        project_div.classList.add("project");
        
        const link = document.createElement("a");
        link.href = project.url;
        const header = document.createElement("h3");
        header.innerText = project.name;
        
        link.appendChild(header);

        project_div.appendChild(link);

        const description = document.createElement("p");
        description.innerText = project.description;

        project_div.appendChild(description);

        holder.appendChild(project_div);
    };
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });