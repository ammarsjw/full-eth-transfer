require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.23",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000
                    }
                }
            }
        ]
    },
    defaultNetwork: "default",
    networks: {
        default: {
            url: process.env.URL,
            accounts: [process.env.FROM_PRIVATE_KEY]
        }
    }
};
