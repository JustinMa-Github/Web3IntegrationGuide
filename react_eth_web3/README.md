# Integrate Eth contract to a React project using Web3.js

## How to Run
0. It’s recommended to use Node.js version 16.
1. Navigate to the ReactEthWeb3 directory and run **npm install**.
2. Start the project with **npm start**.


## How to Play
**Note**: This demo focuses on contract integration, so there is no UI output. All outputs are displayed in the **console**.

0. **Install MetaMask**: Make sure you have MetaMask installed in your browser. Log in and confirm you have test tokens on a test network like Sepolia-Ether.
1. **Connect to MetaMask**: Click the **Connect** button. If you're not logged in, this action will open the MetaMask login window. 
2. **Create Contract Instance**: Once connected, use `web3` to create a contract instance with the contract's ABI and address.
3. **Optional - Set Up Event Listener**: Add a listener for the **Transfer** event to monitor token transfers
4. **Check Total Supply**: Call the `totalSupply` function. You can view the output in the **console**.
5. **Mint Tokens**: Mint tokens to an account. This action will prompt a MetaMask confirmation window. Click **Confirm** to send the transaction.
6. **Verify Transaction**: After the transaction is confirmed, check the output from the Transfer event listener, as well as the updated `totalSupply` value in the console.

## How to Recreate

0. It’s recommended to use Node.js version 16.
1. run *npx create-react-app ReactEthWeb3* to create a blank React demo.
2. npm install web3
3. copy contract folder to your project.
4. Modify index.js to wrapper you App with Web3ReactProvider
5. Modify App.js to create 6 buttons to corresponding to six functions, you can start from **connect** function.
