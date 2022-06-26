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
  addressWatcher = "address_watchers",
  address = "addresses",
  app = "apps",
  chainAddress = "chain_addresses",
  contractAbi = "contract_abis",
  contractAbiFunctionEncoding = "contract_abi_function_encodings",
  chain = "chains",
  tag = "tags",
  transaction = "transactions",
  transactionFunction = "transaction_functions",
  transactionAddressReference = "transaction_address_references",
  userAddress = "user_addresses",
  user = "users",
}
