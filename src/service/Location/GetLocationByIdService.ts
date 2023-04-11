import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { LocationCRUD } from "../../repository/CRUD/Location";

class GetLocationByIdService {
  private locationcrud = new LocationCRUD();

  public async execute(id: string, cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      
      const getbyid = await this.locationcrud.getLocationbyId(id);

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

export { GetLocationByIdService };