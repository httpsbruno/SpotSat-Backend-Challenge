import  * as Router from 'express';
import { LocationTest } from '../controller/LocationTest';
import { CreateLocation } from '../controller/Location/CreateLocation';
import { GetAllLocation } from '../controller/Location/GetAllLocation';
import { GetLocationById } from '../controller/Location/GetLocationById';
import { DeleteLocation } from '../controller/Location/DeleteLocation';
import { UpdateLocation } from '../controller/Location/UpdateLocation';

const route = Router();

route.get('/location-test', new LocationTest().handle.bind(new LocationTest()),);
// post - criar local
route.post('/location', new CreateLocation().handle.bind(new CreateLocation()),);

// put/id - editar local
route.put("/location/:id", new UpdateLocation().handle.bind(new UpdateLocation()));
// getall - retorna todos os locais
route.get('/location', new GetAllLocation().handle.bind(new GetAllLocation()),);
// get/id - retorna um local
route.get('/location/:id', new GetLocationById().handle.bind(new GetLocationById()),);
// delete/id - apaga o local
route.delete('/location/:id', new DeleteLocation().handle.bind(new DeleteLocation()),);
export default route;