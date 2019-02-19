





const chiffrementCeasar = (texte, decalage) => {

    let result = "";
    for(let i=0; i<texte.length; i++) {

        let newCode = texte.charCodeAt(i)+parseInt(decalage);

        result = result + String.fromCharCode(newCode);
    }


    return result;

}


console.log(chiffrementCeasar("ABC",1));



