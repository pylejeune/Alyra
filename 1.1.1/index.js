#! /usr/bin/env node

'use strict';

const {prompt} = require('inquirer');
const secret_number = Math.floor(Math.random()*100);

let response = false;
let quirk = '';

const questions = [
    {
        name: 'Devine le nombre secret ( entre 1 et 100 )',
        validate: (input, answers) => {
            quirk = '';

            if(Number.isNaN(parseInt(input))) return "Ce n'est pas un nombre entier";
            
            if( input > secret_number ) quirk += "Le nombre secret est plus petit";
            if( input < secret_number ) quirk += "Le nombre secret est plus grand";
            
            if( Math.abs(input - secret_number) <= 5) quirk += " et la réponse est très proche";
            if( Math.abs(input - secret_number) >= 6 && 
                Math.abs(input - secret_number) <=10) {

                quirk += " et la réponse est proche";
            }
            if( Math.abs(input - secret_number) > 10 ) quirk += " et la réponse est loin"; 

            if( input == secret_number) response = true;

            //Tant que la réponse n'est pas bonne on affiche les aides et on continue
            if(response == false) return quirk;
            
            return true;
        }
    }
]

prompt(questions).then(answers => {
    console.log(`Bravo, la réponse est ${secret_number}`)
});