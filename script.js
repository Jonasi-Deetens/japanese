import { seiOn } from "./collections/seion.js";
import { dakuOn } from "./collections/dakuon.js";
import { yoOn } from "./collections/yoon.js";

createCards();

function createCards() {
    seiOn.forEach( seionChar => {
        createCardElement(seionChar, "seion");
    })

    dakuOn.forEach( dakuonChar => {
        createCardElement(dakuonChar, "dakuon");
    })

    yoOn.forEach( yoonChar => {
        createCardElement(yoonChar, "yoon");
    })
}

function createCardElement(value, section) {
    let id = "#" + section;
    console.log(id);
    const cardSection = document.querySelector(id);

    const card = document.createElement("section");
    card.classList.add("card");

    const h2 = document.createElement("p");
    h2.textContent = value.letter;
    card.append(h2);

    cardSection.appendChild(card);
};