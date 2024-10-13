document.addEventListener("DOMContentLoaded", function() {})


const montant_petit = ["$1","$5","$10","$25","$50","$75","$100","$200","$300","$400","$500","$750"];
const montant_grand = ["$1,000","$5,000","$10,000","$25,000","$50,000","$75,000","$100,000","$200,000","$300,000","$400,000","$500,000","$750,000","$1,000,000"];
const montants_malette = [];

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
    div.onclick = function() { alert(valeur)};
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

function boutton_jeu(){
    alert("boutton clické!")
}
