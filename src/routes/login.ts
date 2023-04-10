import  * as Router from 'express';
import { Login } from '../controller/Login';


const route = Router();

route.post('/login', new Login().handle.bind(new Login()),);



export default route;
