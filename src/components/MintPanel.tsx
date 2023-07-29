import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { ShdwDrive } from "@shadow-drive/sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useMemo, useState } from "react";

export const MintPanel: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [storageSize, setStorageSize] = useState<number | undefined>();
  const [storageName, setStorageName] = useState<string | undefined>();
  const [accountToUpload, setaccountToUpload] = useState<PublicKey>();
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [txnSig, setTxnSig] = useState<string>("");

  const { data: storageAccountsData, status: storageAccountsStatus } = useQuery({
    queryKey: ["storageAccounts"],
    queryFn: async () => {
      const drive = await new ShdwDrive(connection, wallet).init();
      const accts = await drive.getStorageAccounts("v2");
      return accts;
    },
    enabled: !!connection && !!wallet,
  });

  const handleStorageClick = async () => {
    if (!wallet) {
      return;
    }

    const drive = await new ShdwDrive(connection, wallet).init();
    const newAcct = await drive.createStorageAccount(storageName as string, `${storageSize}MB`, "v2");
    console.log(newAcct);
  };

  const handleUploadDataClick = async () => {
    if (!wallet || !accountToUpload || !file) {
      return;
    }
    const drive = await new ShdwDrive(connection, wallet).init();

    const getStorageAccount = await drive.getStorageAccount(accountToUpload);
    const upload = await drive.uploadFile(accountToUpload, file);
    console.log(upload);
    setUploadUrl(upload.finalized_locations[0]);
    setTxnSig(upload.message);
  };

  const handleMintClick = async () => {
    if (!wallet) {
      return;
    }
    const metaplex = new Metaplex(connection);
    metaplex.use(walletAdapterIdentity(wallet));
    const { nft } = await metaplex.nfts().create({
      uri: "https://shdw-drive.genesysgo.net/GyPCmsnrLVEHjAsAuBhYKM1nVfs1koWmpxTZfaEdFyye/testMetadata.json",
      name: "Mobile HTML",
      sellerFeeBasisPoints: 0,
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "200px",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            const fileToUpload = e.target.files;
            fileToUpload && setFile(fileToUpload[0]);
          }}
        />
        <input
          type="text"
          placeholder="drive publickey"
          onChange={(e) => {
            const acct = e.target.value;
            acct && setaccountToUpload(new PublicKey(acct));
          }}
        />
        <button onClick={() => handleUploadDataClick()}>Upload File</button>
        <input
          type="number"
          placeholder="storage size MB"
          onChange={(e) => {
            const size = e.target.value;
            size && setStorageSize(Number(size));
          }}
        />
        <input
          type="text"
          placeholder="storage name"
          onChange={(e) => {
            const title = e.target.value;
            title && setStorageName(title);
          }}
        />
        <button disabled={!storageSize || !storageName} onClick={() => handleStorageClick()}>
          CREATE STORAGE
        </button>
        <button onClick={() => handleMintClick()}>MINT</button>
      </div>
      {storageAccountsStatus === "success" && (
        <div>
          {storageAccountsData.map((acct) => {
            const pubkey = acct.publicKey.toBase58();
            return <div key={pubkey}>{pubkey}</div>;
          })}
        </div>
      )}
      <div>
        {uploadUrl ? (
          <div>
            <h3>Success!</h3>
            <h6>{uploadUrl}</h6>
            <h6>Sig: {txnSig}</h6>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
