export enum ADDRESS_TYPES {
  CONTRACT_20 = "CONTRACT_20",
  CONTRACT_721 = "CONTRACT_721",
  CONTRACT_CUSTOM = "CONTRACT_CUSTOM",
  CONTRACT_UNSPECIFIED = "CONTRACT_UNSPECIFIED",
  EOA = "EOA",
}

export enum CHAIN_NAME {
  MAINNET = "mainnet",
  POLYGON = "polygon",
  // AVAX = "avalanche",
}

export const CHAIN_ID = {
  [CHAIN_NAME.MAINNET]: 1,
  [CHAIN_NAME.POLYGON]: 137,
  // [CHAIN_NAME.AVAX]: 43114,
};

export enum RESPONSE_MESSAGES {
  ERROR = "error",
  SUCCESS = "success",
  UNRESOLVED = "unresolved",
}

export enum DB_OBJECTS {
  _junk = "bla", // Store stuff just to throw away

  addressWatcher = "address_watchers", // id: userid*uuid*chain_addr
  address = "addresses", // id: addr
  app = "apps", // id: userid*chain_name*uuid
  chainAddress = "chain_addresses", // id: addr
  chainAddressType = "chain_address_types", // id: addr
  contractAbi = "contract_abis", // id: addr
  contractAbiFunctionEncoding = "contract_abi_function_encodings", // id: method sig
  chain = "chains", // id: chain name
  tag = "tags", // id: uuid
  transaction = "transactions", // id: hash
  transactionFunction = "transaction_functions", // id: method sig
  transactionAddressReference = "transaction_address_references", // id: uuid
  userAddress = "user_addresses", // id: addr
  user = "users", // id: addr
}
