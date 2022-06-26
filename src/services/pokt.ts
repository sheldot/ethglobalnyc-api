import Web3 from "web3";
import pocketJS from "@pokt-network/pocket-js";

import env from "../utils/env";
import { CHAIN_NAME } from "../utils/interfaces";

export const rpc = {
  [CHAIN_NAME.MAINNET]: new Web3(
    `https://eth-archival.gateway.pokt.network/v1/lb/${env.blockchain.rpcPortalId}`
  ),
  // [CHAIN_NAME.AVAX]: new Web3(
  //   `https://avax-archival.gateway.pokt.network/v1/lb/${env.blockchain.rpcPortalId}`
  // ),
  [CHAIN_NAME.POLYGON]: new Web3(
    `https://poly-archival.gateway.pokt.network/v1/lb/${env.blockchain.rpcPortalId}`
  ),
};
