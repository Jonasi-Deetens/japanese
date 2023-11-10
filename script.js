import { seiOn } from "./collections/seion.js";
import { dakuOn } from "./collections/dakuon.js";
import { yoOn } from "./collections/yoon.js";

let openTabs = 0;
const collections = [seiOn, dakuOn, yoOn];

addTabMenuListeners();
createCards();

function addTabMenuListeners() {
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach( tab => {
        tab.addEventListener("click", openTab);
    });
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

function drawRandomCharacter() {
    const randomSection = document.querySelector(".random-character-container");
    randomSection.innerHTML = "";

    const randomCharacterElement = document.createElement("section");
    let randomCollection = collections[Math.floor(Math.random() * 3)];
    console.log(Math.floor(Math.random() * (randomCollection.length - 1)));
    let randomCharacter = randomCollection[Math.floor(Math.random() * randomCollection.length)];

    const characterFrame = document.createElement("h1");
    characterFrame.classList.add("big");
    characterFrame.textContent = randomCharacter.hiragana;

    randomCharacterElement.appendChild(characterFrame);
    randomSection.appendChild(randomCharacterElement);
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