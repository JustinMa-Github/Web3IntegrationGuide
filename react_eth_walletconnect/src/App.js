import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Contract } from './contract';
import { ethers } from 'ethers';
import useWalletConnect from './contract/useWalletConnect';

function App() {
  const { provider, account, isConnected, connect, disconnect } = useWalletConnect();
  //console.log("provider, account, isConnected, connect: ", {provider, account, isConnected, connect});
  const [instances, setInstances] = useState({
    JustinTestToken: null,
    OtherContractInFuture: null,
  });

  async function createInstance(){
    
    console.log("instance created: ");
  }

  async function addTransferListener(){
    
    console.log("listener added");
  }

  async function totalSupply(){
    console.log("isConnected: ", isConnected);
    if(!isConnected){
      console.log("not connected");
      return;
    }
    const instance = await Contract.JustinTestToken.getInstance(provider);
    const totalSupply = await instance.totalSupply();
    console.log("totalSupply: ", ethers.utils.formatUnits(totalSupply, 18));
  }

  async function mint(){
    console.log("mint: ");
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
