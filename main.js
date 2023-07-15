import './style.css'
import { lorem } from './lorem'

let text = lorem.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ');
let lastReturnedCharacter;
let wordCountControl = document.querySelector("#w-count");
let paragraphCountControl = document.querySelector("#p-count");
let wordCountLabel = document.querySelector("#w-count-label");
let paragraphCountLabel = document.querySelector("#p-count-label");
let wordCount = wordCountControl.value;
let paragraphCount = paragraphCountControl.value;
let copy = document.querySelector(".copy");


function generateRandomSpecialCharacter() {
    let characters = [",", "!", ".", "?"];
    let characterToBeReturned = characters[Math.floor(Math.random() * characters.length)];
    lastReturnedCharacter = characterToBeReturned;
    return characterToBeReturned;
}

function generateParagraph(count = 100) {
    let paragraph = [];
    for (let i = 1; i <= count; i++) {
        paragraph.push(text[Math.floor(Math.random() * text.length)].toLowerCase());
    }
    // Capitalize the first letter in the first word in every paragraph;
    paragraph[0] = paragraph[0].replace(paragraph[0][0], paragraph[0][0].toUpperCase());
    // Add a full-stop to the last word in the paragraph.
    paragraph[paragraph.length - 1] = paragraph[paragraph.length - 1].replace(paragraph[paragraph.length - 1], paragraph[paragraph.length - 1] + ".")
    // Add punctuations;
    paragraph.forEach((word, index) => {
        // Check if the index is not zero and divisible by 10.
        if (index > 0 && index % 10 === 0) {
            let randomNum = Math.floor(Math.random() * 8);
            paragraph[index + randomNum] = paragraph[index + randomNum].replace(paragraph[index + randomNum], paragraph[index + randomNum] + generateRandomSpecialCharacter());
            // Capitalize the first letter of the next word if the punctuation mark that comes before it is not ","
            if (lastReturnedCharacter !== ",") paragraph[index + randomNum + 1] = paragraph[index + randomNum + 1].replace(paragraph[index + randomNum + 1][0], paragraph[index + randomNum + 1][0].toUpperCase());
        }
    })
    return paragraph.join(" ");
}

function generateStructure(wordCount, paragraph = 1) {
    let structure = [];
    for (let i = 0; i < paragraph * 2; i++) {
        if (i % 2 === 0) structure[i] = generateParagraph(wordCount);
        else if (i < (paragraph * 2) - 1) structure[i] = "\n\n";
    }
    return structure.join("");
}

function getControlValues() {
    return { wordCount, paragraphCount };
}

wordCountControl.addEventListener("input", (e) => {
    wordCount = e.target.value;
    wordCountLabel.textContent= e.target.value;
})

paragraphCountControl.addEventListener("input", (e) => {
    paragraphCount= e.target.value;
    paragraphCountLabel.textContent = e.target.value;
})

copy.addEventListener("click", ()=>copyText());


document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    updateUI();
})


function updateUI() {
    let output = generateStructure(getControlValues().wordCount, getControlValues().paragraphCount)
    document.querySelector(".output").innerText = output;
}

async function copyText() {
    let text = document.querySelector(".output").innerText;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (err) {
      alert('Failed to copy: ', err);
    }
  }

updateUI();