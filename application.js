
provider = ethers.getDefaultProvider();

provider.getBlockNumber().then((blockNumber) => {
    console.log("Bloc actuel : " + blockNumber);
    document.getElementById("block").innerHTML = blockNumber
});

provider.getGasPrice().then((gasPrice) => {
    gasPriceString = gasPrice.toString()
    console.log("Prix du gaz : " + gasPriceString);
    document.getElementById("gasPrice").innerHTML = gasPriceString
});

