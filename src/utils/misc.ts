import env from "./env";
import { DB_OBJECTS } from "./interfaces";

export const getDbLocationString = (baseDbLocation: DB_OBJECTS) => {
  return `v${env.db.version}-${baseDbLocation}`;
};
