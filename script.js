const   header = document.querySelector("h1"),
        textArea = document.querySelector("form"),
        inputSection = document.querySelector(".input"),
        submitBtn = document.querySelector("#submitBtn"),
        content = document.querySelector(".col-12"),
        bottom = document.querySelector(".fixed-bottom"),
        footbtns = document.querySelectorAll(".footerbtns"),
        loader = document.querySelector(".loader");

let text,
    speed,
    partials,
    paused = true,
    inte,
    time,
    spans,
    movable,
    rect,
    step, // amount of words the marker skips
    counter = 0;

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

// splits a text string up into substrings to a desired word count
function listOfStrings(text) {
    const partials = [];
    let starter = 0;
    for (let i in text) {
        i = Number(i);
        // if the end of the text string
        if (i === text.length - 1) {
            partials.push(text.substring(starter));
            break;
        }
        // if new-line character and before not a new-line and not a space
        else if (text[i] === "\n" && text[i - 1] !== "\n" && text[i - 1] !== " ") {
            partials.push(text.substring(starter, i));
            starter = i + 1;
        }
        // if two spaces in a row
        else if (text[i] === " " && text[i-1] === " ") {
            starter = i + 1;
            continue;
        }
        else if (text[i] === " ") {
            if (i !== 0) partials.push(text.substring(starter, i));
            starter = i + 1;
        }
        // if two new-lines in a row
        else if (text[i] === "\n" && text[i - 1] === "\n") {
            partials.push("\n", "\n")
            starter = i + 1;
        }
        else if (text[i] === "\t") {
            if (i !== 0) partials.push(text.substring(starter, i));
            partials.push("\t");
            starter = i + 1;
        }
    }
    return partials;
}

async function submit(e) {
    e.preventDefault();
    inputSection.style.display = "none"; // hides form
    submitBtn.style.display = "none"; // hides submit button

    text = e.target[0].value;
    speed = Number(e.target[1].value);
    step = Number(e.target[2].value) + 1;
    if (!text) {
        let story = await getStory();
        partials = listOfStrings(story);
    } else {
        partials = listOfStrings(text);
    }
    let div = document.createElement("div");
    content.appendChild(div);

    if (partials.length > 1400) {
        loader.classList.toggle("d-none");
        await new Promise((res) => {
        setTimeout(res, 100);
        });
    }
    for (let i = 0; i < partials.length; i++) {
        if (partials[i] === "\n") {
        let br = document.createElement("br");
        div.appendChild(br);
        } else if (partials[i] === "\t") {
            let span = document.createElement("span");
            span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
            div.appendChild(span);
        } else {
        let span = document.createElement("span");
        span.classList.add("toRead");
        span.textContent = partials[i];
        div.append(span, " ");
        }
    }
    loader.classList.add("d-none");
    div.setAttribute("class", "mb-3");

    time = (60 / speed * step) * 1000;
    spans = document.querySelectorAll(".toRead");

    // creates movable span
    movable = document.createElement("span");
    movable.style.transition = "all " + time / 2000 + "s" + " ease";
    movable.classList.add("movable");
    document.body.appendChild(movable);

    rect = spans[0].getBoundingClientRect();
    movable.style.left = rect.x + rect.width / 2 - 10 + "px";
    movable.style.top = document.documentElement.scrollTop + rect.y + rect.height - 2 + "px";


    for (button of footbtns) {
        button.classList.toggle("footerbtns");
    }
    // starts reader
    footbtns[1].addEventListener("click", reader);
    // resets reader
    footbtns[2].addEventListener("click", reset);
}
textArea.addEventListener("submit", submit);

function reset() {
    if (counter > 0) {
        paused = true;
        rect = spans[0].getBoundingClientRect();
        movable.style.left = rect.x + rect.width / 2 - 10 + "px";
        movable.style.top = document.documentElement.scrollTop + rect.y + rect.height - 2 + "px";
        counter = 0;
        footbtns[1].innerHTML = '<i class="fas fa-play fa-lg"></i>';
        clearInterval(inte);
    }
}

function moveMarker() {
    if (counter === spans.length - 1) {
        reset();
        return;
    }
    counter += step;

    rect = spans[counter].getBoundingClientRect();
    movable.style.left = rect.x + rect.width / 2 - 10 + "px";
    movable.style.top = (document.documentElement.scrollTop + rect.y + rect.height - 2) + "px";
}
function reader() {
    paused = !paused;

    if (!paused) {
        this.innerHTML = '<i class="fas fa-pause fa-lg"></i>';
        inte = setInterval(moveMarker, time);
    }
    else {
        this.innerHTML = '<i class="fas fa-play fa-lg"></i>';
        clearInterval(inte);
    }
};