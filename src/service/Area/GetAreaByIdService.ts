import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { AreaCRUD } from "../../repository/CRUD/Area";

class GetAreaByIdService {
  private areacrud = new AreaCRUD();

  public async execute(id: string, cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      
      const getbyid = await this.areacrud.getAreabyId(id);

      if (getbyid) {
        return {
          data: JSON.parse(getbyid) ,
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Nenhum dado foi encontrado!" },
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

export { GetAreaByIdService };