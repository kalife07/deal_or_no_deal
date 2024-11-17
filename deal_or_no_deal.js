document.addEventListener("DOMContentLoaded", function() {})


const montant_petit = ["$0.01","$1","$5","$10","$25","$50","$75","$100","$200","$300","$400","$500","$750"];
const montant_grand = ["$1,000","$5,000","$10,000","$25,000","$50,000","$75,000","$100,000","$200,000","$300,000","$400,000","$500,000","$750,000","$1,000,000"];
const montants_malette = [];
const array_messages = ["malette","Bienvenue au jeu!", "\"Deal or No Deal\" est un jeu où le joueur choisit une boîte contenant une somme d'argent cachée. Ensuite, il ouvre d'autres boîtes pour révéler leurs montants. Après chaque série d'ouvertures, un banquier propose une offre d'argent pour racheter sa boîte. Le joueur doit décider d'accepter l'offre (\"deal\") ou de continuer à jouer (\"no deal\") pour tenter de gagner plus. Le jeu se termine quand le joueur accepte une offre ou ouvre toutes les boîtes.", "Commencer le jeu", "Choisir une malette", "La malette choisi est ", "Svp choisir ", "L'offre du banquier est", "Ta malette contient", "$", "Merci d'avoir joué Deal or no deal"];
const array_numero_malettes = [6,5,4,3,2,1];
let boutton_debut = false;
let choix_malette = 0;
let num_malette_choisi = 0;
let malette_restant = 6;
let valeurs_malettes = {};
let choix_plusieurs_malettes = false;

function montants() {
    if (montants_malette.length === 0) { // Only add if array is empty
    for (let i=1;i<27;i++) {
        montants_malette.push(i);
    }
}
    return montants_malette;
}

montants_milieu = montants()

console.log(montants_milieu);

//section gauche
const leftColumn = document.querySelector(".left-column");
leftColumn.innerHTML = "";

montant_petit.forEach(valeur =>{
    const div = document.createElement('div'); // creation nouveau div avec javascript
    div.classList.add('left_box','box');
    div.textContent = valeur;
    leftColumn.appendChild(div);
}
);

//section milieu
const middleColumn = document.querySelector(".middle_column");
middleColumn.innerHTML = "";


montants_malette.forEach(valeur =>{
    const div = document.createElement('div');
    div.textContent = valeur;
    div.onclick = function() {if (choix_plusieurs_malettes==false){
        if (boutton_debut==true && num_malette_choisi==0 ) {
        div.style.visibility = "hidden";
        alert(valeurs_malettes[valeur]);} 
        malette_choisi(valeur);}
        /*else {
            for (let i=0;i<26;i++) {     
                if (valeur==valeurs_malettes[i+1]){
                    div.style.display="none";
                }
        } }*/
            }
    middleColumn.appendChild(div);

})

//section droite
const rightColumn = document.querySelector(".right_column");
rightColumn.innerHTML = "";

montant_grand.forEach(valeur =>{
    const div = document.createElement('div'); // creation nouveau div avec javascript
    div.classList.add('right_box','box');
    div.textContent = valeur;
    rightColumn.appendChild(div);
}
);

const message = document.createElement("div");
message.id = "message_2";

function boutton_jeu(){
    boutton_debut = true;
    document.getElementById("boutton_jeu").style.display="none";
    document.getElementById("explication").style.display="none";
    message.textContent = array_messages[4];
    const topSection = document.getElementById("top-section"); 
    topSection.appendChild(message);

}

function choisir_malettes() {
    choix_plusieurs_malettes = true
    document.getElementById("boutton_continue").style.display="none";
    msg_choisir_mal = "\n"+array_messages[6]+array_numero_malettes[0]+" malettes.";
    div_msg_choisir_mal = document.createElement('div');
    div_msg_choisir_mal.textContent = msg_choisir_mal;
    document.getElementById("message_2").appendChild(div_msg_choisir_mal)

}

malette_top = document.createElement("div");
malette_top.id = "malette_top";
let boutton_continue = document.createElement("div");
boutton_continue.id = "boutton_continue";

function malette_choisi(valeur) {
    /*if (boutton_debut==true && num_malette_choisi==0) {
        num_malette_choisi = num_malette_choisi+1;
        message.textContent = array_messages[5];
        choix_malette = valeur;
        malette_top.textContent = choix_malette;
        const message_2 = document.getElementById("message_2"); 
        message_2.appendChild(malette_top);
        boutton_continue.textContent = "Continuer le jeu"; 
        message_2.appendChild(boutton_continue); 
        boutton_continue.onclick = function() { choisir_malettes(); } // Create a new row (div) for displaying additional content 
        const newRow = document.createElement("div"); newRow.className = "new-row"; // Add a class for styling, if needed 
        newRow.textContent = "New row added dynamically!"; newRow.style.marginTop = "10px";
        message_2.appendChild(boutton_continue);
        boutton_continue.onclick = function() {choisir_malettes();}
        //topSection.textContent = array_messages[6]+malette_restant+" autres malettes.";
    }*/

        if (boutton_debut == true && num_malette_choisi == 0) { // Increment the number of selected malettes 
            num_malette_choisi = num_malette_choisi + 1; // Update the message to inform the user 
            message.textContent = array_messages[5]; 
            choix_malette = valeur; 
            malette_top.textContent = choix_malette; // Get the message_2 element and append the current malette choice 
            const message_2 = document.getElementById("message_2"); message_2.appendChild(malette_top); // Create a new row for the "Continuer le jeu" button 
            const buttonRow = document.createElement("div"); 
            buttonRow.className = "button-row"; // Add a class for styling, if needed 
            buttonRow.style.marginTop = "10px"; // Example styling // Update and add the "Continuer le jeu" button 
            boutton_continue.textContent = "Continuer le jeu"; 
            buttonRow.appendChild(boutton_continue); // Add button to the new row 
            message_2.appendChild(buttonRow); // Append the new row to the parent 
            // Set up the onclick event for the button 
            boutton_continue.onclick = function() { choisir_malettes(); };
        }
    
}

function shuffleArray(array) { 
    array.sort(() => Math.random() - 0.5);
 }



function driver() {
    const montants_total = montant_petit.concat(montant_grand);
    shuffleArray(montants_total);
    //console.log(montants_total, montants_malette);
    for (let i=0;i<montants_malette.length;i++) {
        valeurs_malettes[i+1] = montants_total[i];
    }
    console.log(valeurs_malettes);
    
    
}
