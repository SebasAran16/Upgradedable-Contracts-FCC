//Manual way

const { ethers } = require("hardhat");

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
    const transparentProxy = await ethers.getContract("Box_Proxy");

    const proxyBoxV1 = await ethers.getContractAt(
        "Box",
        transparentProxy.address
    );
    const versionV1 = await proxyBoxV1.version();
    console.log(versionV1);

    const boxV2 = await ethers.getContract("BoxV2");
    const upgradeTx = await boxProxyAdmin.upgrade(
        transparentProxy.address,
        boxV2.address
    );
    await upgradeTx.wait(1);

    //Getting the BoxV2 abi but loading it with the transparent proxy storage
    const proxyBox = await ethers.getContractAt(
        "BoxV2",
        transparentProxy.address
    );
    const versionV2 = await proxyBox.version();
    console.log(versionV2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
