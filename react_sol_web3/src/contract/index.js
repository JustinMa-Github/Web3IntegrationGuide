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
    getInstance:async function(provider){
      const instance = await Contract._getInstance(this, provider);
      const programId = new PublicKey(this.address)
      const [mintPda, mintBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("mint")],
        programId
      );

      this.mintAccount = mintPda;
      return instance;
    }
  },

  _getInstance: async function (contractConfig, provider) {
    return new anchor.Program(contractConfig.idl, provider);
  }
};

export {default as useWeb3} from './useWeb3';