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
  data: ADDRESS_TYPES | Error | null;
  message: RESPONSE_MESSAGES;
}

export const processAddressType = async (
  chainId: CHAIN_ID,
  address: string
): Promise<IProcessAddressTypeResponse> => {
  let requestPayload: IProcessAddressTypeResponse = {
    data: null,
    message: RESPONSE_MESSAGES.UNRESOLVED,
  };

  try {
    // Way to determine if the data is full = is a contract
    const checkDataAtAddress = await rpc[chainId].eth.getCode(address);
    console.log(checkDataAtAddress);

    requestPayload = {
      data:
        checkDataAtAddress === "0x"
          ? ADDRESS_TYPES.EOA
          : ADDRESS_TYPES.CONTRACT_UNSPECIFIED,
      message: RESPONSE_MESSAGES.SUCCESS,
    };
  } catch (e: any) {
    console.log(e);
    requestPayload = {
      data: e,
      message: RESPONSE_MESSAGES.ERROR,
    };
  }
  return requestPayload;
};

// export default asds;
