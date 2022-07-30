const hre = require("hardhat");

async function run() {
    const factory = await hre.ethers.getContractFactory("RandomWords");
    const NFTcontract = await factory.deploy();
    await NFTcontract.deployed();

    console.log("Contract:", NFTcontract.address);

    let txn = await NFTcontract.mint();
    await txn.wait();

    txn = await NFTcontract.mint();
    await txn.wait();
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});