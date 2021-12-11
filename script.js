const   header = document.querySelector("h1"),
        textArea = document.querySelector("form"),
        inputSection = document.querySelector(".input"),
        submitBtn = document.querySelector("#submitBtn"),
        content = document.querySelector(".col-12"),
        bottom = document.querySelector(".fixed-bottom"),
        footbtns = document.querySelectorAll(".footerbtns"),
        loader = document.querySelector(".loader");

let text, speed;

async function submit(e) {
    e.preventDefault();
    inputSection.style.display = "none"; // hides form
    submitBtn.style.display = "none"; // hides submit button

    // gets list of text partials
    text = e.target[0].value;
    speed = e.target[1].value;
    if (!text) {
        let story = await getStory();
        var partials = listOfStrings(story);
    } else {
        var partials = listOfStrings(text);
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
        } else {
        let span = document.createElement("span");
        span.textContent = partials[i];
        div.append(span, " ");
        }
    }
    loader.classList.add("d-none");
    div.setAttribute("class", "mb-3");

    time = (60 / speed) * 1000;
    spans = document.querySelectorAll("span");

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
    footbtns[2].addEventListener("click", reseter);
}
textArea.addEventListener("submit", submit);

let paused = true,
    inte,
    time,
    spans,
    movable,
    rect,
    reset = false;
    counter = 0;

function reseter() {
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
        reseter();
        return;
    }
    counter++;

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


// splits a text string up into substrings to a desired word count
function listOfStrings(text) {
    const partials = [];
    let starter = 0;
    for (let i in text) {
        i = Number(i);
        if (i === text.length - 1) {
            partials.push(text.substring(starter));
            break;
        }
        if (text[i] === "\n" && text[i - 1] !== "\n") {
            partials.push(text.substring(starter, i));
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
            partials.push(text.substring(starter, i));
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