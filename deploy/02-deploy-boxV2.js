const { verify } = require("../utils/verify");
const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("-------------------");
    const boxV2 = await deploy("BoxV2", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.waitConfirmations,
    });

    if (!developmentChains.includes(network.name)) {
        log("Verifying...");
        await verify(boxV2.address, []);
    }
};
