const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    const DataHashStorage = await hre.ethers.getContractFactory("CriminalRecordStorage");
    const dataHashStorage = await DataHashStorage.deploy();
    
    await dataHashStorage.deploymentTransaction();
    
    console.log("DataHashStorage deployed to:", await dataHashStorage.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });