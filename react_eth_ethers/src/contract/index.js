import JustinTestTokenAbi from './JustinTestToken.json'
import { ethers } from 'ethers';

const ETHEREUM_MAINNET = {
  chainId: '0x1',
  chainName: 'Ethereum Mainnet',
};

const ETHEREUM_SEPOLIA = {
  chainId: '0xaa36a7',
  chainName: 'Ethereum Sepolia Testnet',
};

const BINANCE_MAINNET = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain Mainnet',
};

const BINANCE_TESTNET = {
  chainId: '0x61',
  chainName: 'Binance Smart Chain Testnet',
};

const TARGET_NETWORK = ETHEREUM_SEPOLIA;

export const Contract = {
  NETWORK:TARGET_NETWORK,
  
  JustinTestToken:{
    contractName:JustinTestTokenAbi.contractName,
    address:'0x03b04076860da07a5938689001A6A21d6778a628',
    abi:JustinTestTokenAbi.abi,
    getInstance:async function(provider){
      return await Contract._getInstance(this, provider);
    }
  },
  
  _getInstance: async function (contractConfig, provider) {
    const signer = provider?.getSigner();
    const network = await provider?.getNetwork();
    if (network?.chainId !== parseInt(Contract.NETWORK.chainId, 16)) {
      console.error("ChainId not match, please switch to correct network, current chainId: ", network?.chainId, 
                    " contract ", contractConfig.contractName, " was deployed on chain: ", Contract.NETWORK.chainId);
      return null;
    }
    return new ethers.Contract(contractConfig.address, contractConfig.abi, signer);
  }
}

export { default as useEthers } from './useEthers';