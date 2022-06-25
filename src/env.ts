import "dotenv/config";

interface IServerConfig {
  port: string;
}

interface IRpcConfig {
  gatewayId: string;
}

interface IEnvConfig {
  server: IServerConfig;
  rpc: IRpcConfig;
}

const configSet = {
  development: {
    server: {
      port: process.env.LOCAL_SERVER_PORT,
    },
    rpc: {
      gatewayId: process.env.LOCAL_RPC_GATEWAY_ID,
    },
  } as IEnvConfig,

  production: {
    server: {
      port: process.env.PORT || process.env.PROD_SERVER_PORT,
    },
    rpc: {
      gatewayId: process.env.PROD_RPC_GATEWAY_ID,
    },
  } as IEnvConfig,
};

let activeConfig: IEnvConfig = configSet.development;
if (process.env.NODE_ENV === "production") {
  activeConfig = configSet.production;
}

export default activeConfig;
