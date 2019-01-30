#! /usr/bin/env node

'use strict';

const {prompt} = require('inquirer');

const min = 1;
const max = 100;
const tabSearch = [];

let response = null;
 
//Remplissage du tableau
for(let i = min;i<= max;i++){
    tabSearch.push(parseInt(i));
}

// le tableau doit être ordre croissant
const compare = (x, y) => {
    return x - y;
}

tabSearch.sort(compare);

const questions = [
    {
        name: `Saisir un nombre entre ${min} et ${max}`,
        validate: (input, answers) => {

            if(Number.isNaN(parseInt(input))) return "Ce n'est pas un nombre entier";
            if( input < min || input > max ) return `Saisissez un nombre entre ${min} et ${max}`;
            response = input;

            return true;
        }
    }
]

/**
 * Fonction de recherche dichotomique
 * @param {int} value 
 * @param {Array} tabSearch 
 */
const search = (value, tabSearch) => {

    let iteration = 0;
    let find = false;
    let iDebut = 0;
    let iFin = tabSearch.length;
    let pivot = 0;

    while(!find && ((iFin - iDebut) > 1 ) ) {

        pivot = parseInt((iDebut + iFin) /2);
        if (tabSearch[pivot] == value) {
            find = true;
        };

        if(tabSearch[pivot] > value ) {
            iFin = pivot;
        }else {
            iDebut = pivot;
        }

        iteration++;
    }

    if (tabSearch[iDebut] == value) {
        console.log(`L'élément tapé par l'utilisateur est à l'emplacement ${iDebut} du tableau`);
    }else{
        console.log("L'élément n'as pas été trouvé");
    };
    
    console.log(`nombre d'itération ${iteration}`)
    console.log(response);
}

prompt(questions).then(answers => {
    search(response, tabSearch);
});