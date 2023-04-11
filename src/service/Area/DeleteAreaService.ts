import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { AreaCRUD } from "../../repository/CRUD/Area";

class DeleteAreaService {
  private areacrud = new AreaCRUD();

  public async execute(id: string, cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      
      const deletearea = await this.areacrud.delete(id);

      if (deletearea) {
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

export { DeleteAreaService };