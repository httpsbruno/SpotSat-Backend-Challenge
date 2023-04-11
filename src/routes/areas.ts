import  * as Router from 'express';
import { CreateArea } from '../controller/Area/CreateArea';

const route = Router();

// post - criar area
route.post('/area', new CreateArea().handle.bind(new CreateArea()),);

// put/id - editar local
// getall - retorna todos os locais
// get/id - retorna um local
// delete/id - apaga o local
export default route;