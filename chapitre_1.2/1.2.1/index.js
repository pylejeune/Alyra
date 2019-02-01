#! /usr/bin/env node

'use strict';


let response = 1;


const factoriel = (n) => {

    parseInt(n);
    let result = 1;
    for (let i= n;i > 1;i--) {

            result *= i;

    }

    console.log("Factorielle de "+n+" = "+result)
    return result;
}

factoriel(1);
factoriel(4);
factoriel(10);
factoriel(100);

