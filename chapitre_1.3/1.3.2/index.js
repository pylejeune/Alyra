


const frequences = (texte) => {


    let counter = [];

    for(let i=0; i<texte.length; i++) {

        if(!counter[texte.charAt(i)]) {
            counter[texte.charAt(i)] = 1;
        }else{
            counter[texte.charAt(i)]++;
        }

    }


    return counter;

}


console.dir(frequences("Etre contesté, c'est être constaté"));