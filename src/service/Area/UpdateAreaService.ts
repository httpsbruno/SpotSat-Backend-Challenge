import { APIResponse } from "../../models/APIResponse";
import { LocationData } from "../../models/LocationData";
import { AreaCRUD } from "../../repository/CRUD/Area";

class UpdateAreaService {
  private areacrud = new AreaCRUD();

  public async execute(
    id: string,
    local: LocationData,
    admin: string
  ): Promise<APIResponse> {
    try {
      local.id = id;
      const update = await this.areacrud.update(local, admin);

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
    } catch (error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { UpdateAreaService };
