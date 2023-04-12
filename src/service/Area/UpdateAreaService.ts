import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { LocationData } from "../../models/LocationData";
import { AreaCRUD } from "../../repository/CRUD/Area";
class UpdateAreaService {
  private areacrud = new AreaCRUD();

  public async execute(
    id: string,
    local: LocationData,
    cookie: string
  ): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      local.id = id;
      const update = await this.areacrud.update(local, checkCookie.payload);
      
      if (update) {
        return {
          data: { status: "Atualizado com sucesso" },
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Erro ao Atualizar !!" },
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

export { UpdateAreaService };
