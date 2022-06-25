import Web3 from "web3";
import pocketJS from "@pokt-network/pocket-js";

import env from "./env";
import { ADDRESS_TYPES, CHAIN_ID, RESPONSE_MESSAGES } from "./interfaces";

const rpc = {
  [CHAIN_ID.MAINNET]: new Web3(
    `https://eth-mainnet.gateway.pokt.network/v1/lb/${env.rpc.gatewayId}`
  ),
  [CHAIN_ID.AVAX]: new Web3(
    `https://avax-mainnet.gateway.pokt.network/v1/lb/${env.rpc.gatewayId}`
  ),
  [CHAIN_ID.POLYGON]: new Web3(
    `https://poly-mainnet.gateway.pokt.network/v1/lb/${env.rpc.gatewayId}`
  ),
};

interface IProcessAddressTypeResponse {
  data: ADDRESS_TYPES;
  message: RESPONSE_MESSAGES;
}

export const processAddressType = async (
  chainId: CHAIN_ID,
  address: string
): IProcessAddressTypeResponse => {
  let requestPayload: IProcessAddressTypeResponse = {
    data: null,
    message: RESPONSE_MESSAGES.UNRESOLVED,
  };
  // EOA = "EOA",

  try {
    // await web3.eth.getBlock("0xe54440");
    requestPayload = {
      data: await rpc[chainId].eth.getCode(address),
      message: RESPONSE_MESSAGES.SUCCESS,
    };
  } catch (e) {
    console.log(e);
    requestPayload = {
      data: e,
      message: RESPONSE_MESSAGES.ERROR,
    };
  }
  return requestPayload;
};

// export default asds;
