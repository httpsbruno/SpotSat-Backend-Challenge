import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { LocationCRUD } from "../../repository/CRUD/Location";
class GetAllLocationService {
  private locationcrud = new LocationCRUD();

  public async execute(cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      
      const getall = await this.locationcrud.getAllLocation();

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

export { GetAllLocationService };