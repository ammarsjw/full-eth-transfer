const hre = require("hardhat");

async function main() {
    // Getting chain data.
    const chainId = (await hre.ethers.provider.getNetwork()).chainId.toString();

    // Getting sender as a signer and recipient as an address.
    const signers = await hre.ethers.getSigners();
    const from = signers[0];
    const to = process.env.TO_ADDRESS;

    // Getting sender's balance.
    const balance = await hre.ethers.provider.getBalance(from.address);

    // Checking and getting gas price.
    const desiredGasPrice = process.env.MAX_GAS_PRICE;
    const gasPrice = await getGasPrice(desiredGasPrice);

    // Logging chain data.
    console.log("ChainId:", chainId);

    // Calculating amount.
    const gasUsed = hre.ethers.toBigInt(21000);
    const transactionFee = gasPrice * gasUsed;
    const amount = balance - transactionFee;

    // Double checking gas price.
    if ((await hre.ethers.provider.getFeeData()).gasPrice != gasPrice) {
        console.log((await hre.ethers.provider.getFeeData()).gasPrice);
        throw "Gas price mismatch";
    }

    // Sending transacation.
    await from.sendTransaction({
        to: to,
        gasPrice: gasPrice,
        gasLimit: 21000,
        value: amount
    });

    // Logging data.
    console.log("Transferred");
    console.log("From           :", from.address);
    console.log("To             :", to);
    console.log("Value          :", amount.toString());
    console.log("Initial Balance:", balance.toString());
    console.log("Transaction Fee:", transactionFee.toString());

    // Exiting.
    process.exit();
}

async function getGasPrice(desiredGasPrice) {
    let feeData = await hre.ethers.provider.getFeeData();
    let gasPrice = hre.ethers.formatUnits(feeData.gasPrice, "gwei");
    console.log("Gas Price:", gasPrice, "Gwei");

    if (desiredGasPrice != "") {
        while (gasPrice > desiredGasPrice) {
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
