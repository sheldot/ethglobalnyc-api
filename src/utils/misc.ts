import env from "./env";
import { DB_OBJECTS } from "./interfaces";

export const getDbLocationString = (baseDbLocation: DB_OBJECTS) => {
  return `${env.db.version}-${baseDbLocation}`;
};
