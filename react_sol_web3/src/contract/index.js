//import  { default as anchor } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import token_minter_idl from "./token_minter.json";
import { Buffer } from "buffer";

export const Contract = {
  NETWORK: 'https://api.devnet.solana.com',

  JustinTestToken:{
    contractName:token_minter_idl.metadata.name,
    address: token_minter_idl.address,
    idl: token_minter_idl,
    mintAccount:null,
    _instance : null,
    getInstance:async function(provider){
      const instance = await Contract._getInstance(this, provider);
      const [mintPda, mintBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("mint")],
        new PublicKey(this.address)
      );

      this.mintAccount = mintPda;
      return instance;
    }
  },

  _getInstance: async function (contractConfig, provider) {
    if (contractConfig._instance) {
      return contractConfig._instance;
    }
    contractConfig._instance = new anchor.Program(contractConfig.idl, provider);
    return contractConfig._instance;
  }
};

export {default as useWeb3} from './useWeb3';