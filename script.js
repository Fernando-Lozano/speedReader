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
        if (partial === " ") {
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
        if (text[i] === "\n") {
            let subString = text.substring(starter, i+1);
            subString = subString.slice(0, subString.length - 1) + " ";
            partials.push(subString);
            starter = i + 1;
            spaceCount = 0;
        }
        if (i === text.length - 1) {
            partials.push(text.substring(starter));
        }
    }
    return partials;
}

// content from https://www.how-to-type.com/typing-practice/quote/nonfiction/?length=long
const material = [
    "From up here at dawn the pilot looked down upon poor hopeless Las Vegas (or Yuma, Corpus Christi, Meridian, San Bernardino, or Dayton) and began to wonder: How can all of them down there, those poor souls who will soon be waking up and trudging out of their minute rectangles and inching along their little noodle highways toward whatever slots and grooves make up their everyday lives--how could they live like that, with such earnestness, if they had the faintest idea of what it was like up here in this righteous zone",
    "Unlike criticism, contempt is particularly toxic because it assumes a moral superiority in the speaker. Contempt is often directed at people who have been excluded from a group or declared unworthy of its benefits. Contempt is often used by governments to provide rhetorical cover for torture or abuse. Contempt is one of four behaviors that, statistically, can predict divorce in married couples. People who speak with contempt for one another will probably not remain united for long.",
    "When you are developing a new technique, there are no recipes to copy, textbooks to consult, or manuals to read to pass on those little tips and secrets that guarantee success. You end up having to try any and every permutation of conditions and ingredients. You are never quite sure which of the many factors is really significant, how they act with and against one another, and so on. To sort out all those variables requires carefully designed trials. This is basic experimentation at its toughest and, if you succeed, at its best.",
    "All a manipulator has to do is suggest to the conscientious person that they don't care enough, are too selfish, etc., and that person immediately starts to feel bad. On the contrary, a conscientious person might try until they're blue in the face to get a manipulator (or any other aggressive personality or disordered character) to feel badly about a hurtful behavior, acknowledge responsibility, or admit wrongdoing, to absolutely no avail.",
    "Handling of the F-4 in every region of flight, from traffic patterns to high performance dogfighting, was based on angle of attack. Rather than use indicated airspeed and calculations of weight of fuel or stores remaining, the optimum speed was simply an angle of attack of the wing. Regardless of weight, temperature, density altitude, or anything else, the wing's best angle of attack was always the same.",
    "Annie Wilkes, the nurse who holds Paul Sheldon prisoner in Misery, may seem psychopathic to us, but it's important to remember that she seems perfectly sane and reasonable to herself--heroic, in fact, a beleaguered woman trying to survive in a hostile world filled with cockadoodie brats. We see her go through dangerous mood-swings, but I tried never to come right out and say 'Annie was depressed and possibly suicidal that day' or 'Annie seemed particularly happy that day.' If I have to tell you, I lose. If, on the other hand, I can show you a silent, dirty-haired woman who compulsively gobbles cake and candy, then have you draw the conclusion that Annie is in the depressive part of a manic-depressive cycle, I win. And if I am able, even briefly, to give you a Wilkes'-eye-view of the world--if I can make you understand her madness--then perhaps I can make her someone you sympathize with or even identify with. The result? She's more frightening than ever, because she's close to real.",
    "It is impossible, I think, for us to envision the richness and diversity of cell chemistry. The level of detail is atomic in dimensions but astronomical in variety. Every structure inside a cell is covered with a mosaic of chemical groups, positioned and maintained by the mechanisms just mentioned. Every protein molecule is subtly different, carrying not only the imprint of history, shaped by evolution over millennia, but also an echo of recent events.",
    "We become more successful when we are happier and more positive. For example, doctors put in a positive mood before making a diagnosis show almost three times more intelligence and creativity than doctors in a neutral state, and they make accurate diagnoses 19 percent faster. Optimistic salespeople outsell their pessimistic counterparts by 56 percent. Students primed to feel happy before taking math achievement tests far outperform their neutral peers. It turns out that our brains are literally hardwired to perform at their best not when they are negative or even neutral, but when they are positive.",
    "Resistance is fear. But Resistance is too cunning to show itself naked in this form. Why? Because if Resistance lets us see clearly that our own fear is preventing us from doing our work, we may feel shame at this. And shame may drive us to act in the face of fear. Resistance doesn't want us to do this. So it brings in Rationalization. Rationalization is Resistance's spin doctor. It's Resistance's way of hiding the Big Stick behind its back. Instead of showing us our fear (which might shame us and impel us to do our work), Resistance presents us with a series of plausible, rational justifications for why we shouldn't do our work."
]