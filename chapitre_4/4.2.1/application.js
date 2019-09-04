
//provider = ethers.getDefaultProvider();
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



const abi = [
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

let contratCredibilite = new ethers.Contract("0xB0A828b36F477ABBfD156E1E9075aEa8AAc09B08", abi, provider);
console.log(contratCredibilite);

let maCredibilite =  contratCredibilite.cred("0x5c60D7d3aB9245B111602D3091A2d610A7997f98");

