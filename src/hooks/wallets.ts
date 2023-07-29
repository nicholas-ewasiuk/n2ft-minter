import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { useMemo } from "react";

export function useConnectedWallet(): Wallet | undefined {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  return useMemo(
    () =>
      publicKey && signTransaction && signAllTransactions
        ? { publicKey, signTransaction, signAllTransactions, payer: Keypair.fromSeed(Buffer.alloc(32)) }
        : undefined,
    [publicKey, signTransaction, signAllTransactions],
  );
}

export type ConnectedWallet = Wallet;

export interface Wallet {
  signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]>;
  publicKey: PublicKey;
  /**
   * Dummy keypair used to satisfy anchor types.
   */
  payer: Keypair;
}