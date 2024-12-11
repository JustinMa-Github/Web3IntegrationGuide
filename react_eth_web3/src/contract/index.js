import JustinTestTokenAbi from './JustinTestToken.json'

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
    _instance : null,
    getInstance:async function(web3){
      return await Contract._getInstance(this, web3);
    }
  },
  _getInstance: async function (contractConfig, web3) {
    if (contractConfig._instance) {
      return contractConfig._instance;
    }
    const chainId = await web3?.eth.getChainId();
    if (chainId !== parseInt(Contract.NETWORK.chainId, 16)) {
      console.error("ChainId not match, please switch to correct network, current chainId: ", chainId, 
                    " contract ", contractConfig.contractName, " was deployed on chain: ", Contract.NETWORK.chainId);
      return null;
    }
    contractConfig._instance = new web3.eth.Contract(contractConfig.abi,contractConfig.address);
    return contractConfig._instance;
  }
}

export {default as useWeb3} from './useWeb3';