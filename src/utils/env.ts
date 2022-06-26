import "dotenv/config";

interface IServerConfig {
  port: string;
}

interface IBlockchainConfig {
  dataApiKey: string;
  rpcPortalId: string;
}

interface IDatabaseConfig {
  username: string;
  password: string;
  accessUrl: string;
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
      username: process.env.LOCAL_STORJ_ACCESS_KEY_ID,
      password: process.env.LOCAL_STORJ_SECRET,
      accessUrl: process.env.LOCAL_STORJ_GATEWAY_URL,
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
      username: process.env.PROD_STORJ_ACCESS_KEY_ID,
      password: process.env.PROD_STORJ_SECRET,
      accessUrl: process.env.PROD_STORJ_GATEWAY_URL,
    },
  } as IEnvConfig,
};

let activeConfig: IEnvConfig = configSet.development;
if (process.env.NODE_ENV === "production") {
  activeConfig = configSet.production;
}

export default activeConfig;
