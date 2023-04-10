import  * as express from 'express';
import Login from './login';
import Location from './locations'
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Login);
app.use(Location);

export default app;
