import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { useEthers, Contract } from './contract';
import { ethers } from 'ethers';

function App() {
  const { provider, signer, account, isConnected, connect, disconnect } = useEthers();
  console.log("provider, signer, account, isConnected, connect: ", {provider, signer, account, isConnected, connect});
  const [instances, setInstances] = useState({
    JustinTestToken: null,
    OtherContractInFuture: null,
  });

  //Step 2: Create instance of contract.
  async function createInstance(){
    //Before create instance a contract, make sure the wallet connected to the same chain as the contract deployed.
    //const web3 = new Web3(window.ethereum);
    const network = await provider?.getNetwork();
    if (network?.chainId !== parseInt(Contract.NETWORK.chainId, 16)) {
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

  async function addTransferListener(){
    const instance = instances["JustinTestToken"];
    if (!instance) {
      console.error(`JustinTestToken instance not created. Please create instance first.`);
      return;
    }
    
    const handleTransfer = (from, to, value, event) => {
      console.log(`Transfer from ${from} to ${to} of ${value.toString()} tokens`);
    };

    //Mointor all Transfer event
    //instance.on("Transfer", handleTransfer);
    
    //Monitor Transfer event from specific address, all to specific address
    const filter = instance.filters.Transfer("0x0000000000000000000000000000000000000000");
    instance.on(filter, handleTransfer);

    //remove listener when user closes the tab
    window.addEventListener('beforeunload', () => {
      if (instance) {
        instance.off("Transfer", handleTransfer);
        console.log("Listener removed");
      }
    });

    console.log("listener added");
  }
  async function totalSupply(){
    const instance = instances["JustinTestToken"];
    if (!instance) {
      console.error(`JustinTestToken instance not created. Please create instance first.`);
      return;
    }
    const totalSupply = await instance.totalSupply();
    console.log("totalSupply: ", totalSupply.toString());
  }
  async function mint(){
    const instance = instances["JustinTestToken"];
    if (!instance) {
      console.error(`JustinTestToken instance not created. Please create instance first.`);
      return;
    }
    try {
      const amount = ethers.utils.parseUnits("100", "ether");
      const tx = await instance.mint(account, amount);
      console.log("mint tx: ", tx);
    } catch (error) {
      console.error("mint error: ", error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connect}>connect</button>
        <button onClick={createInstance}>createInstance</button>
        <button onClick={addTransferListener}>addTransferListener</button>
        <button onClick={totalSupply}>totalSupply</button>
        <button onClick={mint}>mint</button>
        <button onClick={disconnect}>disconnect</button>
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
