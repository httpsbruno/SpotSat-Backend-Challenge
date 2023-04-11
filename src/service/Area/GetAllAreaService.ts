import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { AreaCRUD } from "../../repository/CRUD/Area";
class GetAllAreaService {
  private areacrud = new AreaCRUD();

  public async execute(cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      
      const getall = await this.areacrud.getAllArea();

      if (getall) {
        return {
          data: JSON.parse(getall) ,
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

export { GetAllAreaService };