import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Contract, useWeb3 } from './contract';

const App = () => {
  const { chainId, account, provider, isConnected, connect, disconnect } = useWeb3();
  //const { active:isConnected, account, library:provider, activate:connect, deactivate:disconnect, chainId } = useWeb3React();
  console.log("Web3React Context:", {chainId, isConnected, account, provider});
  //const web3 = provider;//The library will be undefined until connected.

  const [instances, setInstances] = useState({
    JustinTestToken: null,
    OtherContractInFuture: null,
  });

  //Setp 1: Connect to wallet by invoking connect function directly. 
  //The context will be updated automatically after user connected to wallet

  //Step 2: Create instance of contract.
  async function createInstance(){
    //Before create instance a contract, make sure the wallet connected to the same chain as the contract deployed.
    //const web3 = new Web3(window.ethereum);
    if (chainId !== parseInt(Contract.NETWORK.chainId, 16)) {
      //Tell users to switch to correct network on wallet themself.

      //Or, switch network programmatically like this:
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Contract.NETWORK.chainId }],
      });
      //After switch network, create instance again.
    }
    const instance = await Contract.JustinTestToken.getInstance(provider);
    setInstances((prevInstances) => ({
      ...prevInstances,
      ["JustinTestToken"]: instance
    }));
    console.log("instance created: ",instance);
  }

  //Step 3: Add event listener to listen to a specific event.
  //The returnValues of the event are different for each event, please check the 'inputs' of the event in the contract ABI file.
  //For example, for the Transfer event, the returnValues are {from, to, value}
  /*
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
  */
  async function addTransferListener(){
    const instance = instances["JustinTestToken"];
    if (!instance) {
      console.error(`JustinTestToken instance not created. Please create instance first.`);
      return;
    }
    instance.events.Transfer({ 
      //you can moinitor specific address by adding filter
      //filter: {from: "0x0000000000000000000000000000000000000000"},
      fromBlock: 'latest' 
    }).on('data', (event) => {
          const { from, to, value } = event.returnValues;
          console.log("Transfer event - From:", from, "To:", to, "Value:", value);
          //Your logic, like updating UI, etc.
        })
        .on('error', (error) => {
          console.error("Error in event listener:", error);
        });

    //remove listener when user closes the tab
    window.addEventListener('beforeunload', () => {
      if (instance) {
        instance.events.Transfer().unsubscribe();
        console.log("Listener removed");
      }
    });

    console.log("listener added");
  }

  //Step 4: Call a getter function of the contract.
  //Call a getter function will not send a transaction to the blockchain, so it will not cost gas fee and don't need user to confirm the transaction.
  async function totalSupply(){
    const instance = instances["JustinTestToken"];
    if (!instance) {
      console.error(`JustinTestToken instance not created. Please create instance first.`);
      return;
    }
    const supply = await instance.methods.totalSupply().call();
    console.log(`JustinTestToken Total Supply:`, supply);
  }

  //Step 5: Call a setter function of the contract.
  //Call a setter function will send a transaction to the blockchain, so it will cost gas fee from user account.
  //User need to confirm the transaction on wallet. Or, reject the transaction.
  async function mint(){
    const instance = instances["JustinTestToken"];
    if (!instance) {
      console.error(`JustinTestToken instance not created. Please create instance first.`);
      return;
    }
    try {
      const amount = provider.utils.toWei('100', 'ether');
      //Mint 100 tokens to user account.
      //This will trigger the Transfer event, and the listener will catch the event. 
      const mint = await instance.methods.mint(account, amount).send({from:account});
      console.log("mint: ",mint);
    } catch (ex) {
      console.error(ex);
    }
  }

  //Step 6: Disconnect from wallet.
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick = {connect}>connect</button>
          <button onClick = {createInstance}>createInstance</button>
          <button onClick = {addTransferListener}>addTransferListener</button>
          <button onClick = {totalSupply}>totalSupply</button>
          <button onClick = {mint}>mint</button>
          <button onClick = {disconnect}>disconnect</button>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;
