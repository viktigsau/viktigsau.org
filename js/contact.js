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
    const holder = document.getElementById('contact');
    for (let i = 0; i < socials.length; i++) { 
        const social = socials[i];
        
        const socials_div = document.createElement("div");

        const logo = document.createElement("img");
        logo.src = social.img;
        logo.classList.add("contact-img");

        const link = document.createElement("a");
        link.target = "_blank";
        link.href = social.link
        link.classList.add("contact-link");
        link.appendChild(logo);

        const name = document.createElement("p");

        name.innerText = social.name;

        link.appendChild(name);

        socials_div.appendChild(link);

        socials_div.classList.add("contact-link");

        holder.appendChild(socials_div);
    };

    const pos = holder.getBoundingClientRect();
    const vh = window.visualViewport.height;
    holder.style.paddingBottom =  vh-pos.top-100 + "px";
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });