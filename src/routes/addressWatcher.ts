import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { addObjectToDb, getAllDbObjects, getDbObject } from "../services/storj";
import { CHAIN_NAME, DB_OBJECTS, RESPONSE_MESSAGES } from "../utils/interfaces";

const addAddressWatcherRoutes = (app: Express) => {
  // Get the address watchers for the app id
  app.get(
    "/v0/address-watchers",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.query");
      console.log(req.query);

      if (
        !("userAddress" in req.query) ||
        typeof req.query["userAddress"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add an user address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        // get all the apps
        const dbLocation = DB_OBJECTS.app;
        const returnedAfterUpload = await getAllDbObjects(dbLocation);

        // filter out the ones that only have user in the first part
        const reducedList = returnedAfterUpload
          ? returnedAfterUpload.filter((appName: any) => {
              if (appName) {
                let appUserAddress = appName.split("/")[1];
                appUserAddress = appUserAddress.split("*")[0];

                return req.query.userAddress === appUserAddress;
              }
              return false;
            })
          : [];

        return res.send(reducedList);
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
        // get all the apps
        const dbLocation = DB_OBJECTS.app;
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
        !("trackingAddress" in req.body) ||
        typeof req.body["trackingAddress"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add a tracking address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("userAddress" in req.body) ||
        typeof req.body["userAddress"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add a user address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("appId" in req.body) ||
        typeof req.body["appId"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add an app id",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        const { trackingAddress, appId, userAddress } = req.body;

        // Create an address watcher
        const dbLocation = DB_OBJECTS.addressWatcher;

        // id = trackingAddress*appId
        // appId = userAddress*uuid
        const objectId = `${trackingAddress}*${appId}`;

        const returnedAfterUpload = await addObjectToDb(dbLocation, objectId, {
          trackingAddress,
          author: userAddress,
        });

        return res.send(returnedAfterUpload);
      }
    }
  );
};

export default addAddressWatcherRoutes;
