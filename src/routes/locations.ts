import * as Router from "express";
import { CreateLocation } from "../controller/Location/CreateLocation";
import { GetAllLocation } from "../controller/Location/GetAllLocation";
import { GetLocationById } from "../controller/Location/GetLocationById";
import { DeleteLocation } from "../controller/Location/DeleteLocation";
import { UpdateLocation } from "../controller/Location/UpdateLocation";
import { Auth } from "../middleware/middlewareAuth";
const route = Router();

route.post(
  "/location",
  new Auth().handle.bind(new Auth()),
  new CreateLocation().handle.bind(new CreateLocation())
);

route.put(
  "/location/:id",
  new Auth().handle.bind(new Auth()),
  new UpdateLocation().handle.bind(new UpdateLocation())
);

route.get(
  "/location",
  new Auth().handle.bind(new Auth()),
  new GetAllLocation().handle.bind(new GetAllLocation())
);

route.get(
  "/location/:id",
  new Auth().handle.bind(new Auth()),
  new GetLocationById().handle.bind(new GetLocationById())
);

route.delete(
  "/location/:id",
  new Auth().handle.bind(new Auth()),
  new DeleteLocation().handle.bind(new DeleteLocation())
);

export default route;
