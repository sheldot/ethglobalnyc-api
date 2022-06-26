import { getAllDbObjects } from "../services/storj";
import { DB_OBJECTS } from "./interfaces";

export const getAppForAppId = async (appId: string) => {
  const allApps = await getAllDbObjects(DB_OBJECTS.app);

  // filter out the ones that only have user in the first part
  const reducedAppList = allApps
    ? allApps.filter((appName: any) => {
        if (appName) {
          let appCoreId = appName.split("/")[1];

          return (appId as string)?.toLowerCase() === appCoreId.toLowerCase();
        }
        return false;
      })
    : [];

  return reducedAppList;
};
export const getAddressWatchersForAppId = async (appId: string) => {
  // get all the address watchers
  const returnedAfterUpload = await getAllDbObjects(DB_OBJECTS.addressWatcher);

  // filter out the ones that only have user in the first part
  const reducedList = returnedAfterUpload
    ? returnedAfterUpload.filter((addressWatcherId: any) => {
        if (addressWatcherId) {
          let currentAppId = addressWatcherId.split("/")[1];
          const idParts = currentAppId.split("*");
          currentAppId = `${idParts[1]}*${idParts[2]}*${idParts[3]}`;

          return appId === currentAppId;
        }
        return false;
      })
    : [];

  const populateList = reducedList.map((addressWatcherId: any) => {
    let coreId = addressWatcherId.split("/")[1];
    const idParts = coreId.split("*");

    return {
      parts: {
        trackingAddress: idParts[0],
        userAddress: idParts[1],
        chain: idParts[2],
        uuid: idParts[3],
      },
      fullId: coreId,
    };
  });

  return populateList;
};
