# Full ETH Transfer

This repository includes a simple javascript file to fully transfer native tokens on most evm chains without leaving any residual amount.

## How do I get set up?

Open a terminal in your workspace and then type in the following commands to fulfil the setup requirements:

1. `git clone https://github.com/ammarsjw/full-eth-transfer.git`
2. `cd full-eth-transfer`
3. `npm i`

## How to run the script?

### Setup environment variables

Set the `URL`, `FROM_PRIVATE_KEY` and `TO_ADDRESS` as environment variables. You can achieve this by first creating a file named **.env** at the root of your project. Then copy the contents of the **.env.example** file into your **.env** file. Finally fill in the variables for the relevant network you are deploying to.

`URL`: This is the RPC URL of your desired network. Most online resources can provide these for free.<br>
`FROM_PRIVATE_KEY`: This is the private key of the account that contains the native tokens.<br>
`GAS_PRICE_UPPER_BOUND` **[Optional]**: This is the maximum gas price you are willing to pay for the transaction. This environment variable can be set to `0` if no limit needs to be imposed on gas price. The script will recheck gas price and only execute if it is less than or equal to the given amount.<br>
`TO_ADDRESS`: This is the public address of the recipient of the aforementioned native tokens.

### Run the script

Open a terminal at the root of your project. Then run the following command:

`npm start`
