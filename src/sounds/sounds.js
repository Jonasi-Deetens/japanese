import { descriptionsOfFeelings } from '../../collections/gijougo.js';
import { inanimateSounds } from '../../collections/giongo.js';
import { animalSounds, humanSounds } from '../../collections/giseigo.js';
import { descriptionsOfConditions } from '../../collections/gitaigo.js';
import { descriptionsOfMotions } from '../../collections/giyougo.js';

const collectionOfTableNames = ["Animal Sounds", "Human sounds/noises", "Sounds that objects make", "Words that describe feelings", "Words that describe conditions or state", "Words that describe movement"];
const collectionsOfSound = [animalSounds, humanSounds, inanimateSounds, descriptionsOfFeelings, descriptionsOfConditions, descriptionsOfMotions];

generateTables();

function generateTables() {
    const main = document.querySelector("main");
    collectionsOfSound.forEach((collection, index) => {

        const h2 = document.createElement("h2");
        h2.textContent = collectionOfTableNames[index];
        h2.classList.add("division-heading");
        main.appendChild(h2);

        const tbl = document.createElement("table");
        tbl.classList.add("sound-table");

        const tr = tbl.insertRow();
        const headerOne = tr.insertCell();
        headerOne.classList.add("sound-table-header");
        headerOne.style.textAlign = "left";
        headerOne.textContent = "Description";
        
        const headerTwo = tr.insertCell();
        headerTwo.classList.add("sound-table-header");
        headerTwo.textContent = "Hiragana";

        const headerThree = tr.insertCell();
        headerThree.classList.add("sound-table-header");
        headerThree.textContent = "Katakana";

        collection.forEach(sound => {
            const tr = tbl.insertRow();
    
            const cellOne = tr.insertCell();
            cellOne.textContent = sound.description;
            cellOne.style.textAlign = "left";
    
            const cellTwo = tr.insertCell();
            cellTwo.textContent = sound.hiragana;

            const cellThree = tr.insertCell();
            cellThree.textContent = sound.katakana;
        });

        main.appendChild(tbl);
    });
}
