import { v4 } from "uuid";
import { APIResponse } from "../../models/APIResponse";
import { LocationData } from "../../models/LocationData";
import { LocationCRUD } from "../../repository/CRUD/Location";
class CreateLocationService {
  private locationcrud = new LocationCRUD();

  public async execute(
    local: LocationData,
    admin: string
  ): Promise<APIResponse> {
    try {
      local.id = v4();
      const insert = await this.locationcrud.insert(local, admin);

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
    } catch (error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { CreateLocationService };
