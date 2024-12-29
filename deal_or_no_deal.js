document.addEventListener("DOMContentLoaded", function() {});

const montant_petit = ["$0.01", "$1", "$5", "$10", "$25", "$50", "$75", "$100", "$200", "$300", "$400", "$500", "$750"];
const montant_grand = ["$1,000", "$5,000", "$10,000", "$25,000", "$50,000", "$75,000", "$100,000", "$200,000", "$300,000", "$400,000", "$500,000", "$750,000", "$1,000,000"];
const montants_malette = [];
const array_messages = [
    "malette", "Bienvenue au jeu!", "\"Deal or No Deal\" est un jeu où le joueur choisit une boîte contenant une somme d'argent cachée...",
    "Commencer le jeu", "Choisir une malette", "La malette choisi est ", "Svp choisir ", "L'offre du banquier est", "Ta malette contient",
    "$", "Merci d'avoir joué Deal or no deal"
];
const array_numero_malettes = [6, 5, 4, 3, 2, 1];

let boutton_debut = false;
let choix_malette = 0;
let num_malette_choisi = 0;
let malette_restant = 6;
let valeurs_malettes = {};
let choix_plusieurs_malettes = false;

function montants() {
    if (montants_malette.length === 0) { 
        for (let i = 1; i <= 26; i++) {
            montants_malette.push(i);
        }
    }
    return montants_malette;
}

montants();

const leftColumn = document.querySelector(".left-column");
leftColumn.innerHTML = "";

montant_petit.forEach(valeur => {
    const div = document.createElement('div');
    div.classList.add('left_box', 'box');
    div.textContent = valeur;
    leftColumn.appendChild(div);
});

const middleColumn = document.querySelector(".middle_column");
middleColumn.innerHTML = "";

let num_malette = 0;
montants_malette.forEach(valeur => {
    const div = document.createElement('div');
    div.textContent = valeur;
    //let num_malette = 0;

    div.onclick = function() {if (choix_plusieurs_malettes==false){
        if (boutton_debut==true && num_malette_choisi==0 ) {
        div.style.visibility = "hidden";
        //alert(valeurs_malettes[valeur]);
        } 
        malette_choisi(valeur);}
            
            
        
    };

    middleColumn.appendChild(div);
});

const rightColumn = document.querySelector(".right_column");
rightColumn.innerHTML = "";

montant_grand.forEach(valeur => {
    const div = document.createElement('div');
    div.classList.add('right_box', 'box');
    div.textContent = valeur;
    rightColumn.appendChild(div);
});

const message = document.createElement("div");
message.id = "message_2";

function boutton_jeu() {
    boutton_debut = true;
    document.getElementById("boutton_jeu").style.display = "none";
    document.getElementById("explication").style.display = "none";
    message.textContent = array_messages[4];
    const topSection = document.getElementById("top-section");
    topSection.appendChild(message);
}

function choisir_malettes() {
    choix_plusieurs_malettes = true;
    document.getElementById("boutton_continue").style.display = "none";
    const msg_choisir_mal = `\n${array_messages[6]} ${array_numero_malettes[0]} malettes.`;
    const div_msg_choisir_mal = document.createElement('div');
    div_msg_choisir_mal.textContent = msg_choisir_mal;
    document.getElementById("message_2").appendChild(div_msg_choisir_mal);
}

const malette_top = document.createElement("div");
malette_top.id = "malette_top";
const boutton_continue = document.createElement("div");
boutton_continue.id = "boutton_continue";
let selectedMalettes = [];
let maxSelections = 6;

function malette_choisi(valeur) {
    if (choix_plusieurs_malettes) {
        if (selectedMalettes.length<maxSelections) {
            selectedMalettes.push(valeur);

            Array.from(document.querySelectorAll(".middle_column div")).find(div => div.textContent == valeur);
            if (div) div.style.visibility = "hidden";
            const montant = valeurs_malettes[valeur];

            const amountDiv = Array.from(document.querySelectorAll(".left-column .box, .right_column .box"))
                .find(div => div.textContent === montant);
            if (amountDiv) {
                amountDiv.style.color = "red"; // Change the color to red
                amountDiv.style.fontWeight = "bold"; // Optional: Make the text bold
                amountDiv.style.backgroundColor = "blue";
            }
        }
    }
    else if (boutton_debut && num_malette_choisi === 0) {
        num_malette_choisi++;
        choix_malette = valeur;
        const montant = valeurs_malettes[valeur];
        message.textContent = array_messages[5];
        malette_top.textContent = choix_malette;
        const message_2 = document.getElementById("message_2");
        message_2.appendChild(malette_top);
        //ajout du boutton continuer le jeu
        const buttonRow = document.createElement("div");
        buttonRow.className = "button-row";
        buttonRow.style.marginTop = "10px";
        boutton_continue.textContent = "Continuer le jeu";
        buttonRow.appendChild(boutton_continue);
        message_2.appendChild(buttonRow);
        boutton_continue.onclick = function () {
            choisir_malettes();
        };
    }
    /*if (boutton_debut && num_malette_choisi === 0) {
        num_malette_choisi++;
        message.textContent = array_messages[5];
        choix_malette = valeur;
        malette_top.textContent = choix_malette;
        const message_2 = document.getElementById("message_2");
        message_2.appendChild(malette_top);
        
        boutton_continue.textContent = "Continuer le jeu";
        message_2.appendChild(boutton_continue);
        boutton_continue.onclick = choisir_malettes;
    }*/
}

function shuffleArray(array) { 
    array.sort(() => Math.random() - 0.5);
}

function driver() {
    const montants_total = montant_petit.concat(montant_grand);
    shuffleArray(montants_total);

    for (let i = 0; i < montants_malette.length; i++) {
        valeurs_malettes[i + 1] = montants_total[i];
    }
    console.log(valeurs_malettes);
}

driver();
