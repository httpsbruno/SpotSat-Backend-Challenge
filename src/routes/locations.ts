import  * as Router from 'express';
import { LocationTest } from '../controller/LocationTest';
import { CreateLocation } from '../controller/Location/CreateLocation';

const route = Router();

route.get('/location-test', new LocationTest().handle.bind(new LocationTest()),);
// post - criar local
route.post('/location', new CreateLocation().handle.bind(new CreateLocation()),);

// put/id - editar local
// getall - retorna todos os locais
// get/id - retorna um local
// delete/id - apaga o local
export default route;