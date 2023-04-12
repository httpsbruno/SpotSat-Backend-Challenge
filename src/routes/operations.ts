import * as Router from "express";
import { DistanceBetween } from "../controller/Operations/DistanceBetween";
import { LocationInArea } from "../controller/Operations/LocationInArea";
import { LocationsInArea } from "../controller/Operations/LocationsInArea";
const route = Router();

// dintance
route.get(
  "/places/:id1/distanceto/:id2",
  new DistanceBetween().handle.bind(new DistanceBetween())
);

// location in area
route.get(
  "/places/:locationName/:areaName",
  new LocationInArea().handle.bind(new LocationInArea())
);
//locations in area
route.get(
  "/places/:areaName",
  new LocationsInArea().handle.bind(new LocationsInArea())
);

export default route;
