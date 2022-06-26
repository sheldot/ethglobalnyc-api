import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { addObjectToDb, getAllDbObjects, getDbObject } from "../services/storj";
import { getAddressWatchersForAppId } from "../utils/dto";
import { CHAIN_NAME, DB_OBJECTS, RESPONSE_MESSAGES } from "../utils/interfaces";

const addAddressWatcherRoutes = (app: Express) => {
  // Get the address watchers for the app id
  app.get(
    "/v0/address-watchers",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.query");
      console.log(req.query);

      if (!("app_id" in req.query) || typeof req.query["app_id"] !== "string") {
        return res.status(404).send({
          data: "Add an app id",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        // filter out the ones that only have user in the first part
        const cleanedList = await getAddressWatchersForAppId(
          req.query["app_id"]
        );

        return res.send(cleanedList);
      }
    }
  );

  // Get a specific address watcher
  app.get(
    "/v0/address-watcher",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.query");
      console.log(req.query);

      if (!("id" in req.query) || typeof req.query["id"] !== "string") {
        return res.status(404).send({
          data: "Add an address watcher id",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        // get a specific address watcher
        const dbLocation = DB_OBJECTS.addressWatcher;
        const returnedAfterUpload = await getDbObject(
          dbLocation,
          req.query["id"]
        );

        return res.send(returnedAfterUpload);
      }
    }
  );

  // Create an address watcher for an app
  app.post(
    "/v0/address-watcher",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.body");
      console.log(Object.keys(req));
      console.log(req.body);

      if (!req.body) {
        return res.status(404).send({
          data: "Invalid request body",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("tracking_address" in req.body) ||
        typeof req.body["tracking_address"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add a tracking address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("user_address" in req.body) ||
        typeof req.body["user_address"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add a user address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("app_id" in req.body) ||
        typeof req.body["app_id"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add an app id",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        const allApps = await getAllDbObjects(DB_OBJECTS.app);

        // filter out the ones that only have user in the first part
        const reducedList = allApps
          ? allApps.filter((appName: any) => {
              if (appName) {
                let appCoreId = appName.split("/")[1];

                return req.body["app_id"] === appCoreId;
              }
              return false;
            })
          : [];

        if (reducedList.length === 0) {
          return res.status(404).send({
            data: "App id not found",
            message: RESPONSE_MESSAGES.ERROR,
          });
        }

        const { tracking_address, app_id, user_address } = req.body;

        // Create an address watcher
        const dbLocation = DB_OBJECTS.addressWatcher;

        // id = trackingAddress*appId
        // appId = userAddress*uuid
        const objectId = `${tracking_address}*${app_id}`;

        const returnedAfterUpload = await addObjectToDb(dbLocation, objectId, {
          trackingAddress: tracking_address,
          author: user_address,
        });

        return res.send(returnedAfterUpload);
      }
    }
  );
};

export default addAddressWatcherRoutes;
