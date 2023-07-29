import { API_KEY } from "@/constants";
import "@/styles/globals.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import React, { useMemo } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

export default function App({ Component, pageProps }: AppProps) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter({ network }),

      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );

  const queryClient = new QueryClient();

  return (
    <ConnectionProvider endpoint={API_KEY}>
      <WalletProvider wallets={wallets} autoConnect>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
        </QueryClientProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
