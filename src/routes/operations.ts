import  * as Router from 'express';
import { DistanceBetween } from '../controller/Operations/DistanceBetween';


const route = Router();

route.get('/places/:id1/distanceto/:id2', new DistanceBetween().handle.bind(new DistanceBetween()),);
// post - criar local


export default route;