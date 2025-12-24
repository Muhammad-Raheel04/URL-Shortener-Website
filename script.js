const shortenedURL = document.getElementById("shortenedURL");
const shortenBtn = document.getElementById('shortenButton');

shortenBtn.addEventListener('click', async () => {

    const longURLInput = document.getElementById('LongUrlInput').value;
    if (longURLInput.trim() === "") {
        shortenedURL.innerText = "Please enter a valid URL.";
        shortenedURL.style.color = "#ff0000";
        return;
    }

    shortenBtn.innerText = "Shortening...";
    shortenBtn.disabled = true;
    shortenBtn.style.cursor = "not-allowed";
    shortenBtn.style.opacity = "0.6";
    try {

        const response = await fetch("https://api.tinyurl.com/create", {
            method: "POST",
            headers: {
                "authorization": "bearer use_your_own_api_key_here",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: `${longURLInput}`
            })
        });
        const jsonData = await response.json();

        shortenedURL.innerText = jsonData.data.tiny_url;
        shortenedURL.style.color = "#1aff1a";
    } catch (e) {
        shortenedURL.innerText = "Error shortening URL. Please try again.";
    }
    finally {
        shortenBtn.innerText = "Shorten URl";
        shortenBtn.disabled = false;
        shortenBtn.style.cursor = "pointer";
        shortenBtn.style.opacity = "1";
    }
});


const copyBtn = document.getElementById("copyButton");
copyBtn.addEventListener("click", () => {
    const textToCopy = shortenedURL.innerText;
    if (textToCopy.includes("Error shortening") || textToCopy.includes("appear here") || textToCopy.includes("Please enter")) {
        alert("No valid URL to copy!");
        return;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Copied to clipboard!");
        })
        .catch((err) => {
            alert("Failed to copy:");
        })
});

const visitBtn = document.getElementById("visit");
visitBtn.addEventListener("click", () => {
    const urlToVisit = shortenedURL.innerText;
    if (urlToVisit.includes("Error shortening") || urlToVisit.includes("appear here") || urlToVisit.includes("Please enter")) {
        alert("No valid URL to visit!");
        return;
    }
    window.open(urlToVisit, '_blank');
})





