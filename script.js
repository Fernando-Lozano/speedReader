const header = document.querySelector("h1");
const textArea = document.querySelector("form");
const inputSection = document.querySelector(".input");
const content = document.querySelector(".col-12");
const bottom = document.querySelector(".fixed-bottom");
const footbtns = document.querySelectorAll(".footerbtns");

textArea.addEventListener("submit", async (e) => {
    e.preventDefault();
    inputSection.style.display = "none";

    header.textContent = "Press start to begin";
    // gets list of text partials
    const text = e.target[0].value;
    const wordCount = Number(e.target[1].value);
    if (!text) {
        let story = await getStory();
        var partials = listOfStrings(story, wordCount);
    } else {
        var partials = listOfStrings(text, wordCount);
    }
    let div = document.createElement("div");
    for (let partial of partials) {
        if (partial === "\n") {
            let br = document.createElement("br");
            div.appendChild(br);
        }
        else {
            let span = document.createElement("span");
            span.textContent = partial;
            div.appendChild(span);
        }
    }
    div.setAttribute("class", "mb-3");

    content.appendChild(div);

    for (button of footbtns) {
        button.classList.toggle("footerbtns");
    }

    // listen for start
    const speed = Number(e.target[2].value);
    footbtns[1].addEventListener("click", async function reader() {
        const time = (60 / speed) * wordCount * 1000
        const spans = document.querySelectorAll("span");
        for (let span of spans) {
            span.style.borderBottom = "2px solid black";
            // one-liner from stack overflow
            await new Promise(r => setTimeout(r, time));
            span.style.borderBottom = "2px solid white";
        }
    });
});

// splits a text string up into substrings to a desired word count
function listOfStrings(text, splitter) {
    const partials = [];
    var starter = 0;
    var spaceCount = 0;
    for (let i in text) {
        i = Number(i);
        if (text[i] === " ") {
            spaceCount++;
        }
        if (spaceCount === splitter) {
            partials.push(text.substring(starter, i+1));
            starter = i + 1;
            spaceCount = 0;
        }
        else if (text[i] === "\n") {
            if (text[i-1] !== "\n") {
                let subString = text.substring(starter, i+1);
                subString = subString.slice(0, subString.length - 1);
                partials.push(subString, "\n");
            }
            else {partials.push("\n")}
            starter = i + 1;
            spaceCount = 0;
        }
        else if (i === text.length - 1) {
            partials.push(text.substring(starter));
        }
    }
    return partials;
}
// gets a fairy tale
async function getStory() {
    try {
        // based on number of short stories available
        let random = String(Math.floor(Math.random() * 209)).padStart(3, "0");
        const res = await axios.get(`/GrimmFairyTales/${random}.txt`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}