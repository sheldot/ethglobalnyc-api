import axios from "axios";

import env from "../utils/env";
import { CHAIN_ID, RESPONSE_MESSAGES } from "../utils/interfaces";

interface IAllAddressesResponse {
  data: any | string[] | Error | null;
  message: RESPONSE_MESSAGES;
}

export const getTransactions = async (
  chainId: number,
  address: string
): Promise<IAllAddressesResponse> => {
  const constructedUrl = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/?no-logs=true&key=${env.blockchain.dataApiKey}`;
  console.log("constructedUrl");
  console.log(constructedUrl);
  return axios.get(constructedUrl);
};
