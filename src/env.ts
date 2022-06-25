import "dotenv/config";

interface IServerConfig {
  port: string;
}

interface IEnvConfig {
  server: IServerConfig;
}

const configSet = {
  development: {
    server: {
      port: process.env.LOCAL_SERVER_PORT,
    },
  } as IEnvConfig,

  production: {
    server: {
      port: process.env.PORT || process.env.PROD_SERVER_PORT,
    },
  } as IEnvConfig,
};

let activeConfig: IEnvConfig = configSet.development;
if (process.env.NODE_ENV === "production") {
  activeConfig = configSet.production;
}

export default activeConfig;
