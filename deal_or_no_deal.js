document.addEventListener("DOMContentLoaded", function() {})


const montant_petit = ["$1","$5","$10","$25","$50","$75","$100","$200","$300","$400","$500","$750"];
const montant_grand = ["$1,000","$5,000","$10,000","$25,000","$50,000","$75,000","$100,000","$200,000","$300,000","$400,000","$500,000","$750,000","$1,000,000"];
const montants_malette = [];

function montants() {
    for (let i=0;i<26;i++) {
        montants_malette.push(i);
    }
}

montants_milieu = montants()

console.log(montants_milieu);