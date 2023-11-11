import { seiOn } from "./collections/seion.js";
import { dakuOn } from "./collections/dakuon.js";
import { yoOn } from "./collections/yoon.js";

let openTabs = 0;
let randomCharacter = "";
const collections = [seiOn, dakuOn, yoOn];

addListeners();
createCards();

function addListeners() {
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach( tab => {
        tab.addEventListener("click", openTab);
    });
    
    const checkButton = document.querySelector("#check-button");
    checkButton.addEventListener("click", compareLetters);

    const newButton = document.querySelector("#new-button");
    newButton.addEventListener("click", drawRandomCharacter);

    const searchInput = document.querySelector("#search-input");
    searchInput.addEventListener("keyup", searchCharacterEvent)

    const sentenceInput = document.querySelector("#sentence-input");
    sentenceInput.addEventListener("keyup", convertSentence)
}

function createCards() {
    drawRandomCharacter();

    seiOn.forEach( seionChar => {
        createCardElement(seionChar, "seion");
    })

    dakuOn.forEach( dakuonChar => {
        createCardElement(dakuonChar, "dakuon");
    })

    yoOn.forEach( yoonChar => {
        createCardElement(yoonChar, "yoon");
    })
};

function createCardElement(character, section) {
    let id = "#" + section;
    console.log(id);
    const cardSection = document.querySelector(id);

    const card = document.createElement("section");
    card.classList.add("card");
    card.addEventListener("click", (event) => {showCharacters(event, character)});

    const p = document.createElement("p");
    p.textContent = character.letter;
    card.append(p);

    cardSection.appendChild(card);
};

function clearSides() {
    const hiraganaSection = document.querySelector(".left");
    const katakanaSection = document.querySelector(".right");
    hiraganaSection.innerHTML = "";
    katakanaSection.innerHTML = "";
}

function compareLetters() {
    const input = document.querySelector("#letter-input");
    const value = input.value;
    const result = document.querySelector(".result");

    if(value === randomCharacter.letter) {
        input.style.border = "2px solid green";
        result.textContent = "Good job! Go for the next one."
    } else {
        input.style.border = "2px solid red";
        result.textContent = "Almost, the correct letter is '" + randomCharacter.letter + "'";
    } 
}

function convertSentence() {
    const sentence = document.querySelector("#sentence-input").value;
    const splitSentence = sentence.split(/(\s+)/);

    let characters = [];

    splitSentence.forEach( word => {
        let character = searchCharacter(word);
        if (character !== "") characters.push(character.hiragana);
        else characters.push(word);
    });

    let output = "";
    characters.forEach( word => {
        output += word;
    });

    const result = document.querySelector("#sentence-output");
    result.textContent = output;
}

function drawRandomCharacter() {
    const result = document.querySelector(".result");
    result.textContent = "";

    const randomSection = document.querySelector(".random-character-container");
    randomSection.innerHTML = "";

    const randomCharacterElement = document.createElement("section");
    let randomCollection = collections[Math.floor(Math.random() * 3)];
    randomCharacter = randomCollection[Math.floor(Math.random() * randomCollection.length)];

    const characterFrame = document.createElement("h1");
    characterFrame.classList.add("big");
    characterFrame.textContent = randomCharacter.hiragana + " - " + randomCharacter.katakana;
    randomCharacterElement.appendChild(characterFrame);

    randomSection.appendChild(randomCharacterElement);
}

function searchCharacter(value) {
    let searchedCharacter = "";

    collections.forEach( collection => {
        collection.forEach( character => {
            if (value === character.letter) searchedCharacter = character;
        });
    });

    return searchedCharacter;
}

function searchCharacterEvent(event) {
    const value = event.target.value;
    
    let character = searchCharacter(value);

    if (character !== "") showCharacters(event, character);
    else clearSides();
}

function showCharacters(event, character) {
    const hiraganaSection = document.querySelector(".left");
    const katakanaSection = document.querySelector(".right");
    hiraganaSection.innerHTML = "";
    katakanaSection.innerHTML = "";

    //Hiragana
    const translationSectionHiragana = document.createElement("section");
    translationSectionHiragana.classList.add("sticky");

    const h1Hiragana = document.createElement("h1");
    h1Hiragana.classList.add("big");
    h1Hiragana.textContent = character.hiragana;
    translationSectionHiragana.appendChild(h1Hiragana);

    const pHiragana = document.createElement("p");
    pHiragana.textContent = "'" + character.letter + "'";
    translationSectionHiragana.appendChild(pHiragana);
    
    const h2Hiragana = document.createElement("h2");
    h2Hiragana.textContent = "Hiragana";
    translationSectionHiragana.appendChild(h2Hiragana);

    //Katakana
    const translationSectionKatakana = document.createElement("section");
    translationSectionKatakana.classList.add("sticky");

    const h1Katakana = document.createElement("h1");
    h1Katakana.classList.add("big");
    h1Katakana.textContent = character.katakana;
    translationSectionKatakana.appendChild(h1Katakana);

    const pKatakana = document.createElement("p");
    pKatakana.textContent = "'" + character.letter + "'";
    translationSectionKatakana.appendChild(pKatakana);

    const h2Katakana = document.createElement("h2");
    h2Katakana.textContent = "Katakana";
    translationSectionKatakana.appendChild(h2Katakana);

    //Add to section
    hiraganaSection.appendChild(translationSectionHiragana);
    katakanaSection.appendChild(translationSectionKatakana);
}

function openTab(event) {

    const tab = event.target;
    const query = "#" + tab.textContent.toLowerCase() +"-tab";
    const section = document.querySelector(query);
    
    if (tab.classList.contains("active")) {
        tab.classList.remove("active");
        section.style.display = "none";
        openTabs--;
    } else {
        tab.classList.add("active");
        section.style.display = "block";
        openTabs++;
    }

    if (openTabs === 0) clearSides();
}