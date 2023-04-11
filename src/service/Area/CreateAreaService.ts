import { v4 } from "uuid";
import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { LocationData } from "../../models/LocationData";
import { AreaCRUD } from "../../repository/CRUD/Area";
class CreateAreaService {
  private areacrud = new AreaCRUD();

  public async execute(local: LocationData, cookie: string): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      local.id = v4();
      const insert = await this.areacrud.insert(local, checkCookie.payload);

      if (insert) {
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

export { CreateAreaService };