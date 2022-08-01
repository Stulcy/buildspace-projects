const hre = require("hardhat");

async function deploy() {
    const factory = await hre.ethers.getContractFactory("RandomWords");
    const NFTcontract = await factory.deploy();
    await NFTcontract.deployed();

    console.log("Contract:", NFTcontract.address);

    let txn = await NFTcontract.mint();
    await txn.wait();
    console.log("Minted NFT 1!");

    txn = await NFTcontract.mint();
    await txn.wait();
    console.log("Minted NFT 2!");
}

deploy().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});