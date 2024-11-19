// useEthers.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useEthers = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);

        const ethersSigner = ethersProvider.getSigner();
        setSigner(ethersSigner);

        const address = await ethersSigner.getAddress();
        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("MetaMask not found. Please install it to use this feature.");
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setIsConnected(false);
    console.log("Wallet disconnected");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', connect);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  return { provider, signer, account, isConnected, connect, disconnect };
};

export default useEthers;