import * as express from "express";
import Login from "./login";
import Location from "./locations";
import Area from "./areas";
import Operations from "./operations";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Login);
app.use(Location);
app.use(Area);
app.use(Operations);

export default app;
