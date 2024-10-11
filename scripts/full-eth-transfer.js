const hre = require("hardhat");

async function main() {
    // Checking and getting gas price.
    const gasPriceUpperBound = process.env.GAS_PRICE_UPPER_BOUND;
    const gasPrice = await getGasPrice(gasPriceUpperBound);

    // Logging chain data.
    console.log("ChainId:", (await hre.ethers.provider.getNetwork()).chainId.toString());

    // Getting from and to.
    const signers = await hre.ethers.getSigners();
    const from = signers[0];
    const to = process.env.TO_ADDRESS;

    // Getting from's balance.
    const balance = await hre.ethers.provider.getBalance(from.address);

    // Calculating value.
    const gasUsed = hre.ethers.toBigInt(21000);
    const transactionFee = gasPrice * gasUsed;
    const value = balance - transactionFee;

    // Sending transacation.
    await from.sendTransaction({
        to: to,
        gasPrice: gasPrice,
        gasLimit: 21000,
        value: value
    });

    // Logging data.
    console.log("Transferred");
    console.log("From           :", from.address);
    console.log("To             :", to);
    console.log("Value          :", value.toString());
    console.log("Initial Balance:", balance.toString());
    console.log("Transaction Fee:", transactionFee.toString());

    // Exiting.
    process.exit();
}

async function getGasPrice(gasPriceUpperBound) {
    let feeData = await hre.ethers.provider.getFeeData();
    let gasPrice = hre.ethers.formatUnits(feeData.gasPrice, "gwei");
    console.log("Gas Price:", gasPrice, "Gwei");

    if (gasPriceUpperBound != "0") {
        while (gasPrice > gasPriceUpperBound) {
            feeData = await hre.ethers.provider.getFeeData();

            if (gasPrice != hre.ethers.formatUnits(feeData.gasPrice, "gwei")) {
                gasPrice = hre.ethers.formatUnits(feeData.gasPrice, "gwei");
                console.log("Gas Price:", gasPrice, "Gwei");
            }
        }
    }

    return hre.ethers.parseUnits(gasPrice, "gwei");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    process.exit();
});
