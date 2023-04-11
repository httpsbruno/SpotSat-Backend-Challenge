import { APIResponse } from "../models/APIResponse";
import { authToken } from "../middleware/auth";
import { LoginData } from "../models/LoginData";
import { UserCRUD } from "../repository/CRUD/addUser";
class LocationService {
  private usercrud = new UserCRUD();

  public async execute(login: LoginData ,cookie: string): Promise<APIResponse> {
   
    if(cookie){
        const checkCookie = authToken.verifyToken(cookie);
        
        const insert = await this.usercrud.insert(login, checkCookie.payload );

        if(insert){
          return {
            data: { status: "Adicionado com sucesso" },
            messages: [],
          } as APIResponse;
        } else {
          return {
            data: { status: "Erro ao adicionar" },
            messages: [],
          } as APIResponse;
        }
        
    }

    return {
      data: {},
      messages: ["an error occurred while token verification"],
    } as APIResponse;
  }
}

export { LocationService };
