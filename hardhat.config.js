require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    defaultNetwork: "default",
    networks: {
        default: {
            url: process.env.URL,
            accounts: [process.env.FROM_PRIVATE_KEY]
        }
    }
};
