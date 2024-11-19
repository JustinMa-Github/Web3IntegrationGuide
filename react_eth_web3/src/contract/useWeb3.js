// useEthers.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        setProvider(web3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        setChainId(await web3.eth.getChainId());
        
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("MetaMask not found. Please install it to use this feature.");
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setChainId(null);
    setIsConnected(false);
    console.log("Wallet disconnected");
  };

  //Monitor account and chainId changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(parseInt(chainId, 16));
      });
    }
  }, []);

  return { chainId, account, provider, isConnected, connect, disconnect };
};

export default useWeb3;