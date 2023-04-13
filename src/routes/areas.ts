import * as Router from "express";
import { CreateArea } from "../controller/Area/CreateArea";
import { GetAllArea } from "../controller/Area/GetAllArea";
import { GetAreaById } from "../controller/Area/GetAreaById";
import { DeleteArea } from "../controller/Area/DeleteAreaService";
import { UpdateArea } from "../controller/Area/UpdateArea";
import { Auth } from "../middleware/middlewareAuth";

const route = Router();

route.post(
  "/area",
  new Auth().handle.bind(new Auth()),
  new CreateArea().handle.bind(new CreateArea())
);

route.put(
  "/area/:id",
  new Auth().handle.bind(new Auth()),
  new UpdateArea().handle.bind(new UpdateArea())
);

route.get(
  "/area",
  new Auth().handle.bind(new Auth()),
  new GetAllArea().handle.bind(new GetAllArea())
);

route.get(
  "/area/:id",
  new Auth().handle.bind(new Auth()),
  new GetAreaById().handle.bind(new GetAreaById())
);

route.delete(
  "/area/:id",
  new Auth().handle.bind(new Auth()),
  new DeleteArea().handle.bind(new DeleteArea())
);

export default route;
