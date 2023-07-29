import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { CONFIRM_OPTIONS, MPL_TOKEN_METADATA } from "../../constants/constants";
import { TokenMetadataJSON } from "@/constants/tokenMetadataIDL";

export function makeTokenMetadataProgram(connection: Connection, wallet: Wallet) {
  const provider = new AnchorProvider(connection, wallet, CONFIRM_OPTIONS);
  return new Program(TokenMetadataJSON, MPL_TOKEN_METADATA, provider);
}