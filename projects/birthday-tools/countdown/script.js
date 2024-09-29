const params = getParams()

if (params.date) {
    const func = () => {
        const output = document.getElementById("output");
        // Define the two dates with hours and minutes
        const now = new Date();
        const birth = new Date(`${now.getFullYear()}${params.date.slice(4)}`);

        // Get the difference in milliseconds
        const diffInMs = birth.getTime() - now.getTime();

        // Convert milliseconds to time units
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        // Calculate the exact difference in days, hours, minutes
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

        if (params.lan == "no") {
            output.innerText = `${days} dager, ${hours}:${minutes}:${diffInSeconds%60}`
            document.getElementsByTagName("h2")[0].innerText = "tid igjen:"
        };

        output.innerText = `${days} days, ${hours}:${minutes}:${diffInSeconds%60}`
    };

    func()

    setInterval(func, 1000)

}else{
    const dialode = document.getElementById("date-dia");

    dialode.showModal()

    const closeButton = document.getElementById("done");

    closeButton.addEventListener("click", () => {
        const date = document.getElementById("date");
        window.location.search = `?date=${date.value}`;
    });
};