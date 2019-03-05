

class vigenere {


    static encode(message, clef){

        message = message.toUpperCase();

        console.log('Message : ', message);
        console.log('Clef : ', clef);

        let messageEncode = '';



        for(let i=0;i<message.length;i++){

            //console.log('\nlettre : ',message[i]);
            let code_lettre = message.charCodeAt(i);
            //console.log('code lettre',code_lettre);

            let decalage = clef.charCodeAt(i%clef.length)-65;
            //console.log('decalage : ',decalage);

            let lettreEncode = String.fromCharCode((code_lettre+decalage));
            //console.log(lettreEncode);

            messageEncode = messageEncode+lettreEncode;

        }

        console.log('Encode :', messageEncode);
        return messageEncode;
    }

    static decode(message, clef){

        let messageDecode = '';

        message = message.toUpperCase();
        console.log('Encode : ', message);
        console.log('Clef : ', clef);



        for(let i=0;i<message.length;i++){

            //console.log('\nlettre : ',message[i]);
            let code_lettre = message.charCodeAt(i);
            //console.log('code lettre',code_lettre);

            let decalage = clef.charCodeAt(i%clef.length)-65;
            //console.log('decalage : ',decalage);

            let lettreDecode = String.fromCharCode((code_lettre-decalage));
            //console.log(lettreEncode);

            messageDecode = messageDecode+lettreDecode;

        }

        console.log('Message :', messageDecode);
        return messageDecode;
    }


    static regroupement(message, n) {

        let arrayGroup = [];
        let group = '';
        message = message.replace(/ /g,"").toUpperCase();


        for(let i=1;i<=message.length;i++){

            group = group+message[i-1];

            if(i%n == 0){

                arrayGroup.push(group);
                group = '';
            }


        }

        if( group != ''){
            arrayGroup.push(group);
        }

        console.log(message);
        console.log(arrayGroup);


        return arrayGroup;

    }

}

let message = "BONJOUR LE monde";
let clef = "ABC";
let messageEncode = "BPPJPWR!NE!OOOFE";

vigenere.encode(message,clef);

console.log("\n");

vigenere.decode(messageEncode,clef);

console.log("\n");


vigenere.regroupement(message,5);


