const shortenedURL=document.getElementById("shortenedURL");
const shortenBtn = document.getElementById('shortenButton').addEventListener('click', async () => {
    const longURLInput = document.getElementById('LongUrlInput').value;

    try {
        const response = await fetch("https://api.tinyurl.com/create", {
            method: "POST",
            headers: {
                "authorization": "bearer jgpXN9ZHEzijDrlx1yoCVtMVcHICjUH7HA6Mng9M8Rt0DHeJWirWYjaaDDEI",
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
        console.log(e);
    }
})

