# Integrate Sol contract to a React project using Web3.js and Anchor framework

## How to Run
0. It’s recommended to use Node.js version 16.
1. Navigate to the ReactSolWeb3 directory and run **npm install**.
2. Start the project with **npm start**.

## How to Play
After you started this demo, you can see a simple page with 6 buttons, follow the steps below and you will experience an whole life cycle of DApp.
**Note**: This demo focuses on contract integration, so there is no UI output. All outputs are displayed in the **console**.

0. **Install Phantom**: Make sure you have Phantom installed in your browser. Log in and confirm you have test tokens on a test network like Devnet. Faucet is a good way to get Sol in Devnet.
1. **Connect to Phantom**: Click the **Connect** button in demo page. If you're not logged in, this action will open the Phantom login window. After succedded, you can find your public key in console.
2. **Create Contract Instance**: Once connected, you can click createInstance button to create a contract instance with the contract's IDL.You need this instance to interact with Rust contract(ie. Solana program).
3. **Optional - Set Up Event Listener**: Add a listener for this **Token** to monitor token transfers.
4. **Check Total Supply**: Call the `totalSupply` function. You can view the output in the **console**.
5. **Mint Tokens**: Mint tokens to an account. This action will prompt a Phantom confirmation window. Click **Confirm** to send the transaction.
6. **Verify Transaction**: After the transaction is confirmed, check the output in console.

## How to Recreate

0. It’s recommended to use Node.js version 16.
1. run *npx create-react-app ReactSolWeb3* to create a blank React demo.
2. npm install solana/web3.js @coral-xyz/anchor @solana/spl-token
3. copy contract folder to your project.
4. Modify App.js to create 6 buttons to corresponding to six functions, you can start from **connect** function.
