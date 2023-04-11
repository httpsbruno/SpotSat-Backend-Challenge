import  * as Router from 'express';
import { CreateArea } from '../controller/Area/CreateArea';
import { GetAllArea } from '../controller/Area/GetAllArea';
import { GetAreaById } from '../controller/Area/GetAreaById';
const route = Router();

// post - criar area
route.post('/area', new CreateArea().handle.bind(new CreateArea()),);

// put/id - editar local
// getall - retorna todos os locais
route.get('/area', new GetAllArea().handle.bind(new GetAllArea()),);
// get/id - retorna um local
route.get('/area/:id', new GetAreaById().handle.bind(new GetAreaById()),);
// delete/id - apaga o local
export default route;