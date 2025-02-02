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


// Added Claudia
// Ensure selectedMalettes is initialized as an array
let selectedMalettes = [];
let maxSelections = 6;


function montants() {
   if (montants_malette.length === 0) {
       for (let i = 1; i < 27; i++) {
           montants_malette.push(i);
       }
   }
   return montants_malette;
}


montants_milieu = montants();


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


   // Added Claudia
   // Ensure selectedMalettes is initialized as an array
   div.onclick = function() {
       if (choix_plusieurs_malettes == false) {
           if (boutton_debut == true && num_malette_choisi == 0) {
               div.style.visibility = "hidden";
           }
           malette_choisi(valeur);
       }
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
   let div_msg_choisir_mal = document.getElementById("msg_choisir_mal");
   if (!div_msg_choisir_mal) {
       div_msg_choisir_mal = document.createElement('div');
       div_msg_choisir_mal.id = "msg_choisir_mal";
       document.getElementById("message_2").appendChild(div_msg_choisir_mal);
   }


   function updateMessage() {
       const remaining = array_numero_malettes.length - selectedMalettes.length;
       // Added Claudia
       // Ensure selectedMalettes is initialized as an array
       // Only update the message if there are malettes left to choose
       if (remaining > 0) {
           div_msg_choisir_mal.textContent = array_messages[6] + remaining + " malettes.";
       } else {
           div_msg_choisir_mal.textContent = "Offre du banquier:"; // Montre l'offre du banquier
       }
   }


   updateMessage();
   const middleColumn = document.querySelector(".middle_column");
   middleColumn.querySelectorAll("div").forEach(div => {
       div.style.pointerEvents = "auto";
       div.style.cursor = "pointer";
       div.onclick = function () {
           const maletteValue = parseInt(div.textContent);
           // Claudia removed : removed const montant = valeurs_malettes[maletteValue];
           malette_choisi(maletteValue);
           updateMessage();
           if (selectedMalettes.length === array_numero_malettes.length) {
               choix_plusieurs_malettes = false;
           }
       };
   });
   //handleNextPhase();
}


const malette_top = document.createElement("div");
malette_top.id = "malette_top";
const boutton_continue = document.createElement("div");
boutton_continue.id = "boutton_continue";
// Claudia removed : removed let selectedMalettes = []; let maxSelections = 6;
const boutton_accepter = document.createElement("div");
const boutton_refuser = document.createElement("div");
boutton_accepter.id = "accepter";
boutton_refuser.id = "refuser";
boutton_accepter.className = "offre";
boutton_refuser.className = "offre";




function malette_choisi(valeur) {
   if (choix_plusieurs_malettes) {
       if (selectedMalettes.length < maxSelections) {
           selectedMalettes.push(valeur); // Add the selected malette
           // Claudia : push the initial selection
           console.log("Malettes sélectionnées:", selectedMalettes);


           const div = Array.from(document.querySelectorAll(".middle_column div")).find(div => div.textContent == valeur);
           if (div) div.style.visibility = "hidden";


           const montant = valeurs_malettes[valeur];
           const amountDiv = Array.from(document.querySelectorAll(".left-column .box, .right_column .box"))
               .find(div => div.textContent === montant);
           if (amountDiv) {
               amountDiv.style.color = "red";
               amountDiv.style.fontWeight = "bold";
               amountDiv.style.backgroundColor = "blue";
           }


           if (selectedMalettes.length === maxSelections) {
               const div_msg_choisir_mal = document.getElementById("msg_choisir_mal");
               // Claudia added
               const remainingMalettes = montants_malette.filter(m => !selectedMalettes.includes(m)); // Calculate remaining malettes


               if (div_msg_choisir_mal) {
                   const message_2 = document.getElementById("message_2");


                   // Update the message to include "Malettes restantes"
                   // Claudia added
                   div_msg_choisir_mal.textContent = `Offre du banquier\nMalettes restantes: ${remainingMalettes.join(", ")}`;


                   // Create buttons for accepting or refusing the offer
                   const buttonRow2 = document.createElement("div");
                   buttonRow2.className = "button-row";
                   buttonRow2.style.marginTop = "10px";


                   boutton_accepter.textContent = "Accepter";
                   boutton_refuser.textContent = "Refuser";


                   buttonRow2.appendChild(boutton_accepter);
                   buttonRow2.appendChild(boutton_refuser);
                   message_2.appendChild(buttonRow2);


                   // Add click behavior for buttons
                   boutton_accepter.onclick = function () {
                       fin_jeu();
                   };
               }


               // Disable further interactions with malettes
               const allMalettes = document.querySelectorAll(".middle_column div");
               allMalettes.forEach(div => {
                   div.style.pointerEvents = "none"; // Disable pointer events
                   div.style.cursor = "default"; // Change cursor to default
               });


               console.log("Remaining Malettes:", remainingMalettes);
               // appele fonction ici au lieu de driver
               offre_banquier(remainingMalettes, 1, 6);
           }
       }
   } else if (boutton_debut && num_malette_choisi === 0) {
       // Added Claudia
       selectedMalettes.push(valeur); // Add the selected malette
       num_malette_choisi++;
       choix_malette = valeur;
       const montant = valeurs_malettes[valeur];
       message.textContent = array_messages[5];
       malette_top.textContent = choix_malette;
       const message_2 = document.getElementById("message_2");
       message_2.appendChild(malette_top);


       // Add "Continue" button to proceed with the game
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


   // Claudia added
   const remainingMalettes = filter(montants_malette, selectedMalettes);
   console.log("Valeurs des malettes:", valeurs_malettes);
   console.log("Malettes sélectionnées:", selectedMalettes);
   console.log("Malettes restantes:", remainingMalettes);

}




const message_fin = document.createElement("div");
message_fin.id = "message_fin";


function fin_jeu() {
   const message_2 = document.getElementById("message_2");
   alert("Jeu terminé");
   const buttonRow2 = document.createElement("div");
   buttonRow2.className = "button-row";
   buttonRow2.style.marginTop = "10px";
   const montant_mal = valeurs_malettes[choix_malette];
   message_fin.textContent = `Merci d'avoir joué Deal or no deal\nOffre acceptée : -\nVotre malette contenait : ${montant_mal}`;
   buttonRow2.appendChild(message_fin);
   message_2.appendChild(buttonRow2);
   const divs_selectionne = document.querySelectorAll('#accepter, #refuser, #msg_choisir_mal');
   divs_selectionne.forEach(el => el.style.display = 'none');
}


function offre_banquier(remainingValues, roundNumber, maxRounds) {
   //a remplir
   // remainingValues = array qui contient les montants restants
   // etape 1: calculation de la somme de remaining Values
   let sum = 0;
   let num_string = 0;

   for (let i=0;i<remainingValues.length;i++) {
        sum = sum+valeurs_malettes[remainingValues[i]];
   }
   console.log(sum);
   console.log(remainingValues);

   for (let i=0;i<remainingValues.length;i++) {
    if(valeurs_malettes[remainingValues[i]].substring(1).includes(',')){
        var comma = Number(valeurs_malettes[remainingValues[i]].substring(1).replace(/,/g, ''));
        num_string = num_string + comma;
    }
    else{
        num_string = num_string + Number(valeurs_malettes[remainingValues[i]].substring(1));
    }
    
    console.log(num_string);
    //+num_string;
   }
   
   
}


// Claudia added
function filter(mainArray, selectedIndexes) {
   return mainArray.filter((_, index) => !selectedIndexes.includes(index));
}




driver();
