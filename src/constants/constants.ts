import { ConfirmOptions, PublicKey } from "@solana/web3.js";

export const MPL_TOKEN_METADATA = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

export const CONFIRM_OPTIONS: ConfirmOptions = {
  preflightCommitment: "confirmed",
  commitment: "confirmed",
};
