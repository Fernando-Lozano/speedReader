const header = document.querySelector("h1");
const textArea = document.querySelector("form");
const inputSection = document.querySelector(".input");
const content = document.querySelector(".col-12");
const bottom = document.querySelector(".fixed-bottom");
const footbtns = document.querySelectorAll(".footerbtns");

textArea.addEventListener("submit", (e) => {
    e.preventDefault();
    inputSection.style.display = "none";

    header.textContent = "Press start to begin";
    // gets list of text partials
    const text = e.target[0].value;
    const wordCount = Number(e.target[1].value);
    const partials = listOfStrings(text, wordCount);
    let div = document.createElement("div");
    for (let partial of partials) {
        let span = document.createElement("span");
        span.textContent = partial;
        div.appendChild(span);
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
        console.dir(spans);
        for (let span of spans) {
            span.style.borderBottom = "2px solid black";
            // one-liner from stack overflow
            await new Promise(r => setTimeout(r, time));
            span.style.borderBottom = "none";
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
        if (i === text.length - 1) {
            partials.push(text.substring(starter));
        }
    }
    return partials;
}