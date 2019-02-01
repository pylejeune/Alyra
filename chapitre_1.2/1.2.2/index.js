#! /usr/bin/env node

'use strict';

/*************************************************************************************/
/*                                  Variables et Constantes                          */
/*************************************************************************************/

const maxOctet = 6000

/*  le total des limites */
let limit = 0;

/* le total des satoshi */
let total = 0;
/* pour l'affichage des pourboires sélectionnés */
let summary = [];

let satoshi = [];
let octets = [];

/* Jeu de données d'origine */
//satoshi = [13000,9000,2000,1500,3500,2800,5000,1500];
//octets = [2000,6000,800,700,1200,1000,1300,600];

/* jeu de données */
//satoshi = [25000,9000,2000,1500,3500,2800,5000,1500];
//octets = [5999,2000,800,700,1200,1000,1300,600];

//satoshi = [25350,9000,2000,1500,3500,2800,5000,1500];
//octets = [5999,2000,800,700,1200,1000,1300,600];

//satoshi = [23000,9000,2000,1500,3500,2800,5000,1500];
//octets = [6000,2000,800,700,1200,1000,1300,600];

//satoshi = [25200,9000,2000,1500,3500,2800,5000,1500];
//octets = [5999,1500,600,700,1100,500,1000,5000];


satoshi = [23000,9000,2000,1500,3500,2800,5000,1500];
octets = [6001,2000,800,700,1200,1000,1300,600];

/*************************************************************************************/
/*                                  Fontions                                         */
/*************************************************************************************/

/**
 * fonction d'addition des valeures d'un tableau
 * @alias Tools/array/tabSum
 * @param tab
 * @returns {number}
 */
const tabSum = (tab) => {

    let sum = 0;
    for(let i=0; i< tab.length; i++){
        sum = sum + tab[i];
    }

    return sum;

}

/**
 * vérifie la cohérence du résultat et le plus gros pourboire
 * @param tab
 */
const checkResult = (satoshi, octets) => {

    let max = Math.max(...satoshi);
    let index = satoshi.indexOf(max);

    let tmpSatoshi = parseInt(satoshi.splice(index,1));
    let tmpOctets = parseInt(octets.splice(index,1));
    let sumSatoshi = parseInt(tabSum(satoshi));
    let sumOctets = parseInt(tabSum(octets));

    console.log("\nsomme - max satoshi : "+sumSatoshi);
    console.log("somme élément restant octets : "+sumOctets);
    console.log("octets de l'élément : "+tmpOctets);
    console.log("valeur max satoshi : "+max+"\n")

    /* si la valeur max est supérieur à la somme du reste des éléments, que c'est inférieur ou égale 6000 octets,et que la somme
        des octets des éléments restant est supérieur à 6000 alors c'est notre pourboire max */

    if ((max >= sumSatoshi ) && tmpOctets <= maxOctet && sumOctets > maxOctet){
        console.log('Direct');
        summary.push({'satoshi': tmpSatoshi, 'octets': tmpOctets, 'ratio' : ratio[index]});
        total = tmpSatoshi;
        limit = tmpOctets;
        return true;
    }else{
        /* sinon on replace les éléments tester en fin de tableau dans le même ordre et on renvoi false*/

        let valueRatio = ratio[index];

        ratio.splice(index,1);

        satoshi.push(max);
        octets.push(tmpOctets);
        ratio.push(valueRatio);

        return false;
    }
}

/**
 * Remplit un tableau de nombre aléatoire
 * @alias Tools/array/fillRandomTab
 * @param int maxRandom nombre maximum pour un random
 * @param int arraySize taille du tableau
 * @returns array
 */
const fillRandomTab = (maxRandom, arraySize) => {

    let tab = [];

    for(let i=0; i<=arraySize; i++){
        let entier = Math.floor(Math.random()*maxRandom);
        tab.push(entier);
    }
    return tab;
}

/* Jeu de données aléatoire*/
satoshi = fillRandomTab(13000, 10);
octets = fillRandomTab(6000, 10);

/**
 * génère de ratio pour les pourboires
 * @param int length
 */
const generateRatio = (length) => {

    for(let i = 0; i<length; i++){
        let result = satoshi[i] / octets[i];

        let res = satoshi[i] * result / 100;

        ratio.push(res);
    }

    if( ratio.length != length){
        throw new Error("Le tableau ratio n'as pas la taille correspondante");
    }

    //console.log("ratio : ");
    //console.log(ratio);
}



/**
 * fonction principale
 */
const search = (ratio, satoshi, octets) => {


    if (satoshi.length != octets.length){
        throw new Error('Le tableau de satoshi et octets sont de taille différente');
    }

    let i = 0;

    while (limit <= maxOctet && i <length) {

        /* on veut l'index du meilleur ratio, index identique aux tableaux satoshi et octets */
        let index = ratio.indexOf(Math.max(...ratio)); //similaire à ratio[Math.max(...ratio)]

        /* Pas d'enregistrment si on dépasse la limite  d'octet et on passe à l'index suivant*/
        if(limit + parseInt(octets[index]) <= maxOctet) {
            limit = limit + parseInt(octets[index]);
            total = total + satoshi[index];
            summary.push({'satoshi': satoshi[index], 'octets': parseInt(octets[index]), 'ratio' : ratio[index]});
        }

        /* on supprime les valeurs déjà testées donc moins de tableau temporaire à déclarer */
        ratio.splice(index,1);
        satoshi.splice(index,1);
        octets.splice(index,1);

        i++;
    }
}

//Le tableau de ratio nous servira à ne prendre que les pourboires rentablent dans la limite de d'octets indiqués, plûtôt que de faire toutes les combinaisons
let ratio = [];

/*************************************************************************************/
/*                                  Début                                            */
/*************************************************************************************/

if (satoshi.length != octets.length){
    throw new Error('Le tableau de satoshi et octets sont de taille différente');
}

let length = satoshi.length;

generateRatio(length);

console.log(`\nsatoshi : ${satoshi}`);
console.log(`octets : ${octets}`);

if(!checkResult(satoshi,octets)) search(ratio, satoshi,octets);

console.log('Pourboires choisi : ')
console.dir(summary);
console.log("\nTotal satoshi : "+total);
console.log("Limite octets: "+limit+" <= 6ko");