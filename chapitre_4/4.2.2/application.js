

let currentProvider = new web3.providers.HttpProvider('http://localhost:7545');
let provider = new ethers.providers.Web3Provider(currentProvider);

provider.getBlockNumber().then((blockNumber) => {
    console.log("Bloc actuel : " + blockNumber);
    document.getElementById("block").innerHTML = blockNumber
});

provider.getGasPrice().then((gasPrice) => {
    gasPriceString = gasPrice.toString()
    console.log("Prix du gaz : " + gasPriceString);
    document.getElementById("gasPrice").innerHTML = gasPriceString
});



async function connectContract(){

    const abi =[
        {
            "constant": false,
            "inputs": [
                {
                    "name": "url",
                    "type": "string"
                }
            ],
            "name": "produireHash",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "destinataire",
                    "type": "address"
                },
                {
                    "name": "valeur",
                    "type": "uint256"
                }
            ],
            "name": "transfert",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "cred",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "listHash",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "devoir",
                    "type": "bytes32"
                }
            ],
            "name": "remettre",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
    stringContract = document.getElementById("contract").value;

    try {
        const addresses = await ethereum.enable()
        const user = addresses[0];
        let contratCredibilite = new ethers.Contract(stringContract, abi, provider);
        contratSinge = contratCredibilite.connect(provider.getSigner(user.address));

        console.log(contratSinge);
        console.log("Adresse user");
        console.log(user.address);

        contratCredibilite.cred("0x439fad7efb636b94b669f3230f17a621d6d210f3").then((cred) => {
            console.log("Credibilite : " + cred);
            document.getElementById("cred").innerHTML = cred
        });

        console.log("Liste Hash");
        console.dir(contratCredibilite.listHash());

        return contratSinge;
    } catch (error) {
        console.log(error);
    }

}

 async function remettre() {

    let contratCredibilite = await connectContract();

    stringDevoir = document.getElementById("devoirs").value;
    await contratCredibilite.produireHash(stringDevoir).then((condentsat) => {
        console.log("condentsat");
        console.dir(condentsat);
    }).catch((err) => {
        console.log(err);
    });

    await contratCredibilite.cred("0x6e580d637903abce4183ab661107f32ebf9e4c7b").then((cred) => {
        console.log("Credibilite : " + cred);
        document.getElementById("cred").innerHTML = cred
    });
};









