import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { LocationCRUD } from "../../repository/CRUD/Location";

class DeleteLocationService {
  private locationcrud = new LocationCRUD();

  public async execute(id: string, cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      
      const deletelocation = await this.locationcrud.delete(id);

      if (deletelocation) {
        return {
          data: "Excluído com sucesso!" ,
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

export { DeleteLocationService };