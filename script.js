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
    if (!text) {
        let story = await getStory();
        var partials = listOfStrings(story);
        console.log(JSON.stringify(story));
        console.log(story);
        console.log(partials);
    } else {
        var partials = listOfStrings(text);
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
    const speed = Number(e.target[1].value);
    console.dir(speed);
    footbtns[1].addEventListener("click", async function reader() {
        const time = (60 / speed) * 1000
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
function listOfStrings(text) {
    const partials = [];
    var starter = 0;
    for (let i in text) {
        i = Number(i);
        if (i === text.length - 1) {
            partials.push(text.substring(starter));
            break;
        }
        if (text[i] === "\n" && text[i - 1] !== "\n") {
            partials.push(text.substring(starter, i) + " ");
            starter = i + 1;
        }
        else if (text[i] === "\n" && text[i - 1] === "\n") {
            partials.push("\n", "\n");
            starter = i + 1;
        }
        else if (text[i-1] === "\n" && (text[i] === "\t" || (text[i] === " " && text[i + 1] === " "))) {
            partials.push("\n");
            starter = i + 1;
        }
        else if (text[i] === " " && text[i-1] === " ") {
            starter = i + 1;
            continue;
        }
        else if (text[i] === " ") {
            partials.push(text.substring(starter, i + 1));
            starter = i + 1;
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