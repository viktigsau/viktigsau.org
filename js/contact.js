fetch(`${window.location.origin}/social-links.json`)
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
    const socials = data.socials;
    const holder = document.getElementById("contact");
    for (let i = 0; i < socials.length; i++) { 
        const social = socials[i];
        
        const socials_div = document.createElement("div");

        const logo = document.createElement("img");
        logo.src = social.img;
        logo.classList.add("contact-img");

        const name = document.createElement("a");
        name.target = "_blank";
        name.href = social.link
        name.classList.add("contact-name");
        name.appendChild(logo);
        socials_div.appendChild(name);

        socials_div.classList.add("contact-link");

        holder.appendChild(socials_div);
    };
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });