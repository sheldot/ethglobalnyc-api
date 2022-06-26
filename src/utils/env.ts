import "dotenv/config";

interface IServerConfig {
  port: string;
}

interface IBlockchainConfig {
  dataApiKey: string;
  rpcPortalId: string;
}

interface IDatabaseConfig {
  accessUrl: string;
  password: string;
  username: string;
  version: string;
}

interface IEnvConfig {
  server: IServerConfig;
  blockchain: IBlockchainConfig;
  db: IDatabaseConfig;
}

const configSet = {
  development: {
    server: {
      port: process.env.LOCAL_SERVER_PORT,
    },
    blockchain: {
      dataApiKey: process.env.LOCAL_COVALENT_API_KEY,
      rpcPortalId: process.env.LOCAL_RPC_GATEWAY_ID,
    },
    db: {
      accessUrl: process.env.LOCAL_STORJ_GATEWAY_URL,
      password: process.env.LOCAL_STORJ_SECRET,
      username: process.env.LOCAL_STORJ_ACCESS_KEY_ID,
      version: process.env.LOCAL_DB_VERSION,
    },
  } as IEnvConfig,

  production: {
    server: {
      port: process.env.PORT || process.env.PROD_SERVER_PORT,
    },
    blockchain: {
      dataApiKey: process.env.PROD_COVALENT_API_KEY,
      rpcPortalId: process.env.PROD_RPC_GATEWAY_ID,
    },
    db: {
      accessUrl: process.env.PROD_STORJ_GATEWAY_URL,
      password: process.env.PROD_STORJ_SECRET,
      username: process.env.PROD_STORJ_ACCESS_KEY_ID,
      version: process.env.PROD_DB_VERSION,
    },
  } as IEnvConfig,
};

let activeConfig: IEnvConfig = configSet.development;
if (process.env.NODE_ENV === "production") {
  activeConfig = configSet.production;
}

export default activeConfig;
