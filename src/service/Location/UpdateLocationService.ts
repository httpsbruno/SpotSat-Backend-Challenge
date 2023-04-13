import { APIResponse } from "../../models/APIResponse";
import { LocationData } from "../../models/LocationData";
import { LocationCRUD } from "../../repository/CRUD/Location";
class UpdateLocationService {
  private locationcrud = new LocationCRUD();

  public async execute(
    id: string,
    local: LocationData,
    admin: string
  ): Promise<APIResponse> {
    try {
      local.id = id;
      const update = await this.locationcrud.update(local, admin);

      if (update) {
        return {
          data: { status: "Atualizado com sucesso" },
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Erro ao Atualizar" },
          messages: [],
        } as APIResponse;
      }
    } catch (error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { UpdateLocationService };
