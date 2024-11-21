# ContractIntegrationGuide

This is a guide for integrating blockchain contracts into a frontend project.Whether you're an experienced front-end developer looking to integrate blockchain, or a seasoned blockchain developer wanting to bring smart contracts into the front end, this guide is perfect for you.
You can not only run the demo commands provided in this guide, but you’ll also learn how to integrate blockchain step-by-step from a blank frontend project.

If you can integrate blockchain into a blank project, you’ll be able to integrate it into your own project as well.

There are two main types of contracts: EVM-compatible and Solana. Each type has its own folder for demonstration. The ReactEthWeb3 folder shows how to integrate EVM-compatible contracts into a React project using Web3.js, while the ReactEthEther folder demonstrates how to integrate contracts using Ethers.js.

Each demo includes six buttons corresponding to six functions:

>* Connect to wallet
>* Create contract instance
>* Add event listener for the Transfer event
>* Call a getter function (totalSupply)
>* Call a setter function (mint)
>* Disconnect from wallet

Once you learn how to add a listener for the Transfer event, you’ll know how to add listeners for any other events, as they differ only in name and parameters. Similarly, if you know how to call the totalSupply function on a token contract, you’ll be able to call other getter functions by adjusting the name and parameters. The same applies to the mint function, which serves as an example for calling other setter functions.

# Suggested Order for Using These Demos
1. Choose the demo that best fits your project: ReactEthWeb3, ReactEthEther or others.
2. Run the demo by following the **How to Run** in each demo’s README.md.
3. Test the six buttons to explore the features,if you are new to crypto, follow the **How to Play** part in each demo’s README.md.
4. Follow the **How to Recreate** part in each demo’s README.md to recreate the demo from scratch.

If you can successfully recreate the demo from scratch, you'll have the skills to integrate any contract into your project. They are simply include additional functions and events, nothing more.

# About the test contract

The test token contract called JustinTestToken is in [THIS](https://github.com/JustinMaDev/JustinTestToken) repository.

## About contract folder
This directory contains the ABI/IDL files for testing contracts, as well as the `index.js` file, which includes the function for creating contract instances. The design of `index.js` is simple, so you can easily understand the code. If you want to test your own contract, simply copy your contract’s ABI file into this directory and update the contract address and ABI filename in `index.js`.

In the contract folder, there is also an additional JavaScript file: like useWeb3.js in the react_eth_web3 project or useEthers.js in the react_eth_ethers project. These files act as adapter hooks to bridge the differences between various libraries. While you could bypass them entirely and implement the desired functionality and connection management directly within App.js, using these hooks provides a clearer structure, allowing you to see exactly how to integrate a contract.

Additionally, you can configure the test chain you want to use in `index.js`, such as Sepolia, BSC testnet, etc.