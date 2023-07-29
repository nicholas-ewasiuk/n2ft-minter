import { MPL_TOKEN_METADATA } from "@/constants/constants";
import { useConnectedWallet } from "@/hooks/wallets";
import { makeTokenMetadataProgram } from "@/utils/metaplex";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { ShdwDrive } from "@shadow-drive/sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC, useState } from "react";


export const AirdropHunter: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [searchText, setSearchText] = useState("");

  const testRPC = async (event: React.MouseEvent<HTMLButtonElement>) => {

  }
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    if (target && target.value) {
      setSearchText(target.value);
    }
  };

  const searchForNft = async () => {
    if (!wallet) {
      return;
    }
    const tokens = await connection.getProgramAccounts(MPL_TOKEN_METADATA, {
      filters: [{
        memcmp: {
          offset: 101,
          bytes: bs58.encode(Buffer.from(searchText)),
        }
      }]
    });
    console.log(`tokens: ${tokens}`);
  }

  /* CANT GET THIS TO WORK UGHH
  const [searched, setSearched] = useState(false);
  useEffect(() => {
    if (!searched && connection) {
      const getToken = async () => {
        console.log("fetching token");
        const tokens = await connection.getProgramAccounts(METAPLEX_TOKEN_METADATA_PROGRAM, {
          filters: [
            {
              memcmp: {
                offset: 101,
                bytes: "2kEnH4",
              },
            },
          ],
        });
        console.log(tokens);
      };
      void getToken();
      setSearched(true);
    }
  }, [connection, searched]);
*/


  return (
    <>
      <div>
        <input type="text" onChange={onInputChange}/>
        <button onClick={searchForNft}>Search</button>
        <button onClick={testRPC}>TEST</button>
      </div>
      <div>
        {/*(uploadUrl) ? (
            <div>
                <h3>Success!</h3>
                <h4>URL: {uploadUrl}</h4>
                <h4>Sig: {txnSig}</h4>
            </div>
        ) : (<div></div>)
        */}
      </div>
    </>
  )
}