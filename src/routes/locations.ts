import  * as Router from 'express';
import { LocationTest } from '../controller/LocationTest';


const route = Router();

route.get('/location-test', new LocationTest().handle.bind(new LocationTest()),);



export default route;