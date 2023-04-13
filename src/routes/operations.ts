import * as Router from "express";
import { DistanceBetween } from "../controller/Operations/DistanceBetween";
import { LocationInArea } from "../controller/Operations/LocationInArea";
import { LocationsInArea } from "../controller/Operations/LocationsInArea";
import { LocationsInCircle } from "../controller/Operations/LocationsInCircle";
import { AreasInCircle } from "../controller/Operations/AreasInCircle";
import { Auth } from "../middleware/middlewareAuth";
const route = Router();

route.get(
  "/places/:id1/distanceto/:id2",
  new Auth().handle.bind(new Auth()),
  new DistanceBetween().handle.bind(new DistanceBetween())
);

route.get(
  "/places/:locationName/:areaName",
  new Auth().handle.bind(new Auth()),
  new LocationInArea().handle.bind(new LocationInArea())
);

route.get(
  "/places/:areaName",
  new Auth().handle.bind(new Auth()),
  new LocationsInArea().handle.bind(new LocationsInArea())
);

route.get(
  "/circle-locations",
  new Auth().handle.bind(new Auth()),
  new LocationsInCircle().handle.bind(new LocationsInCircle())
);

route.get(
  "/circle-areas",
  new Auth().handle.bind(new Auth()),
  new AreasInCircle().handle.bind(new AreasInCircle())
);

export default route;
