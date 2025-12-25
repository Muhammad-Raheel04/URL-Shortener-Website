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
        shortenBtn.innerText = "Shorten URL";
        shortenBtn.disabled = false;
        shortenBtn.style.cursor = "pointer";
        shortenBtn.style.opacity = "1";
    }
});


const copyBtn = document.getElementById("copyButton");
copyBtn.addEventListener("click", () => {

    const textToCopy = shortenedURL.innerText;
    if (textToCopy.includes("Error shortening") || textToCopy.includes("appear here") || textToCopy.includes("Please enter")) {
        copyBtn.innerText = "No valid URL to copy";
        setTimeout(()=>{
            copyBtn.innerText = "Copy URL";
        }, 2000)
        return;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            copyBtn.innerText ="Copied!";
            setTimeout(()=>{
                copyBtn.innerText = "Copy URL";
            },2000)
        })
        .catch((err) => {
            copyBtn.innerText = "Failed to copy";
            setTimeout(()=>{
                copyBtn.innerText = "Copy URL";
            },2000)
        })
});

const visitBtn = document.getElementById("visit");
visitBtn.addEventListener("click", () => {
    const urlToVisit = shortenedURL.innerText;
    if (urlToVisit.includes("Error shortening") || urlToVisit.includes("appear here") || urlToVisit.includes("Please enter")) {
       
        visitBtn.innerText = "No valid URL to visit";
        setTimeout(()=>{
            visitBtn.innerText = "Visit URL";
        },2000)
        return;
    }
    window.open(urlToVisit, '_blank');
})





