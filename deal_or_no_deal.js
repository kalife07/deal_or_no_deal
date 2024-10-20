document.addEventListener("DOMContentLoaded", function() {})


const montant_petit = ["$1","$5","$10","$25","$50","$75","$100","$200","$300","$400","$500","$750"];
const montant_grand = ["$1,000","$5,000","$10,000","$25,000","$50,000","$75,000","$100,000","$200,000","$300,000","$400,000","$500,000","$750,000","$1,000,000"];
const montants_malette = [];
const array_messages = ["malette","Bienvenue au jeu!", "\"Deal or No Deal\" est un jeu où le joueur choisit une boîte contenant une somme d'argent cachée. Ensuite, il ouvre d'autres boîtes pour révéler leurs montants. Après chaque série d'ouvertures, un banquier propose une offre d'argent pour racheter sa boîte. Le joueur doit décider d'accepter l'offre (\"deal\") ou de continuer à jouer (\"no deal\") pour tenter de gagner plus. Le jeu se termine quand le joueur accepte une offre ou ouvre toutes les boîtes.", "Commencer le jeu", "Choisir une malette", "La malette choisi est ", ". Svp choisir", "L'offre du banquier est", "Ta malette contient", "$", "Merci d'avoir joué Deal or no deal"];
const array_numero_malettes = [6,5,4,3,2,1];

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
    div.onclick = function() { malette_choisi(valeur)};
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
    document.getElementById("boutton_jeu").style.display="none";
    message.textContent = array_messages[4];
    const topSection = document.getElementById("top-section"); 
    topSection.appendChild(message);

}

function malette_choisi(valeur) {
    message.textContent = array_messages[5]+valeur+array_messages[6];
}

function driver() {
    
}
