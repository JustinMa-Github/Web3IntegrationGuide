import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
//import { default as anchor } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { useState, useEffect } from 'react';

const useWeb3 = () => {
    const [connection, setConnection] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
  
    const [publicKey, setPublicKey] = useState(null);
    const [balance, setBalance] = useState(null);

    const [mintAddress, setMintAddress] = useState(null);
    useEffect(() => {
        //Solana wallet can NOT switch network dynamically like Metamask, make sure the clusterApiUrl is equal to the network of the wallet
        setConnection(new Connection(clusterApiUrl('devnet')));
    }, []);
    
    const connect = async () => {
      if (window.solana) {
        console.log('window.solana:', window.solana);
        try {
            const response = await window.solana.connect();
            const pubKey = new PublicKey(response.publicKey.toString());
            const anchorProvider = new anchor.AnchorProvider(connection, window.solana, {});
          
            setPublicKey(pubKey);
            setIsConnected(true);
            setProvider(anchorProvider);
            console.log('Connected to response.publicKey.toString():', response.publicKey.toString());          
        } catch (error) {
          console.error("Wallet connection failed:", error);
        }
      } else {
        alert("Please install the Phantom wallet.");
      }
    };
    async function disconnect() {
      if (window.solana) {
        await window.solana.disconnect();
        setPublicKey(null);
        setProvider(null);
        setIsConnected(false);
      }
    }
    useEffect(() => {
      if (window.solana) {
        window.solana.on('accountChanged', (newPublicKey) => {
          console.log('accountChanged', newPublicKey);
          if (newPublicKey) {
            setPublicKey(new PublicKey(newPublicKey.toString()));
          } else {
            setPublicKey(null);
          }
        });
      }
    }, []);

    return { isConnected, publicKey, provider, connection, connect, disconnect };
};

export default useWeb3;
/*
        window.solana.on('networkChanged', (newNetwork) => {
          console.log('networkChanged', newNetwork);
          const newConnection = new Connection(clusterApiUrl(newNetwork));
          setConnection(newConnection);
        });
    async function fetchBalance() {
        if (!connection || !publicKey) return;
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
          console.log('Balance:', balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to get balance:", error);
        }
      }
    useEffect(() => {
        if(publicKey && connection) {
          fetchBalance();
        }
      }, [publicKey, connection]);

*/