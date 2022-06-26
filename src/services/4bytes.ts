import axios from "axios";

import { RESPONSE_MESSAGES } from "../utils/interfaces";

interface IGetEthereumMethodResponse {
  data: string | Error | null;
  message: RESPONSE_MESSAGES;
}

export const getEthereumMethod = async (
  methodSignature: string
): Promise<IGetEthereumMethodResponse> => {
  const constructedUrl = `https://raw.githubusercontent.com/ethereum-lists/4bytes/master/signatures/${methodSignature}`;
  console.log("constructedUrl");
  console.log(constructedUrl);
  return axios.get(constructedUrl);
};
