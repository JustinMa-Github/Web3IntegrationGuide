import JustinTestTokenAbi from './JustinTestToken.json'
import { ethers } from 'ethers';
import RefundableLotteryAbi from './RefundableLottery.json'

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
    _instance : null,
    abi:JustinTestTokenAbi.abi,
    getInstance:async function(provider){
      return await Contract._getInstance(this, provider);
    }
  },
  RefundableLottery:{
    contractName:RefundableLotteryAbi.contractName,
    address: "0x2acc805ce5ed2695832eead1dd95e662f853f688",
    creationBlockNumber: 7193618,
    abi:RefundableLotteryAbi.abi,
    _instance: null,
    getInstance:async function(provider){
      return await Contract._getInstance(this, provider);
    }
  },
  
  _getInstance: async function (contractConfig, provider) {
    if (contractConfig._instance) {
      return contractConfig._instance;
    }
    const signer = provider?.getSigner();
    const network = await provider?.getNetwork();
    if (network?.chainId !== parseInt(Contract.NETWORK.chainId, 16)) {
      console.error("ChainId not match, please switch to correct network, current chainId: ", network?.chainId, 
                    " contract ", contractConfig.contractName, " was deployed on chain: ", Contract.NETWORK.chainId);
      return null;
    }
    contractConfig._instance = new ethers.Contract(contractConfig.address, contractConfig.abi, signer);
    return contractConfig._instance;
  }
}

export { default as useEthers } from './useEthers';