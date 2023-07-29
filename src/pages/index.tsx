import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { MintPanel } from "@/components/MintPanel";

const inter = Inter({ subsets: ["latin"] });

const WalletDisconnectButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false },
);

const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT MINT UI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.walletButtons}>
            <WalletMultiButtonDynamic />
            <WalletDisconnectButtonDynamic />
          </div>
          <MintPanel />
        </div>
      </main>
    </>
  );
}
