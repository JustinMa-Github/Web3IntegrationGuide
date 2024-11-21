import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Contract, useWeb3 } from './contract';
import * as anchor from "@coral-xyz/anchor";
import { Buffer } from "buffer";
import { getMint } from "@solana/spl-token";
import { PublicKey} from "@solana/web3.js";

function App() {
  const { isConnected, publicKey, provider, connection, connect, disconnect } = useWeb3();
  console.log('context:', {isConnected, publicKey, connection, connect});

  const [instances, setInstances] = useState({
    JustinTestToken: null,
    OtherContractInFuture: null,
  });

  async function createInstance(){
    const instance = await Contract.JustinTestToken.getInstance(provider);

    setInstances((prevInstances) => ({
      ...prevInstances,
      ["JustinTestToken"]: instance
    }));
    console.log("instance created: ",instance);

    if (typeof window !== "undefined") {
      window.Buffer = Buffer;
    }
  }

  async function addTokenListener(){
    // Mointor a event of a Solana token is not as easy as Ethereum, but it's possible.
    connection.onLogs(
      Contract.JustinTestToken.mintAccount,
      (logInfo) => {
        console.log("Logs for mint:", Contract.JustinTestToken.mintAccount.toString());
        console.log(logInfo);
      },
      "confirmed"
    );
    console.log("Token listener added.");
  }

  async function totalSupply(){
    const mintAccountInfo = await getMint(connection, Contract.JustinTestToken.mintAccount);

    console.log("mintAccountInfo totalSupply:", mintAccountInfo.supply.toString());
  }

  async function mint(){
    const instance = instances["JustinTestToken"];
    if(!instance){
      console.error("Contract instance not found, please create instance first.");
      return;
    }
    
    const payer = provider.wallet.publicKey; // Payer 的地址
    const receiver = new PublicKey("3VW79TUVeb5wpC8NhqrqyuUekdJyncfEfoxeMwqJuJyb");
    const destinationAccount = anchor.utils.token.associatedAddress({
      mint: Contract.JustinTestToken.mintAccount,
      owner: receiver,
    });
    const quantity = new anchor.BN("100000000");
    
    console.log("mint account:", Contract.JustinTestToken.mintAccount.toString());
    console.log("destination account:", destinationAccount.toString());
    console.log("payer account:", payer.toString());

    console.log("rent:", anchor.web3.SYSVAR_RENT_PUBKEY.toString());
    console.log("systemProgram:", anchor.web3.SystemProgram.programId.toString());
    console.log("tokenProgram:", anchor.utils.token.TOKEN_PROGRAM_ID.toString());
    console.log("associatedTokenProgram:", anchor.utils.token.ASSOCIATED_PROGRAM_ID.toString());
    try{
      const tx = await instance.methods
        .mintTokens(quantity)
        .accounts({
          mint: Contract.JustinTestToken.mintAccount,
          destination: destinationAccount,
          receiver: receiver,
          payer: payer,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId, 
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        })
        .signers([])
        .rpc();
  
      console.log("Transaction successful. Signature:", tx);
    } catch (err) {
      console.error("Transaction failed:", err);
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connect}>Connect</button>
        <button onClick = {createInstance}>createInstance</button>
        <button onClick = {addTokenListener}>addTokenListener</button>
        <button onClick = {totalSupply}>totalSupply</button>
        <button onClick = {mint}>mint</button>
        <button onClick={disconnect}>Disconnect</button>
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
