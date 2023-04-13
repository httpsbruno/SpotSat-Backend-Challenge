import { APIResponse } from "../../models/APIResponse";
import { LocationCRUD } from "../../repository/CRUD/Location";

class DeleteLocationService {
  private locationcrud = new LocationCRUD();

  public async execute(id: string): Promise<APIResponse> {
    try {
      const deletelocation = await this.locationcrud.delete(id);

      if (deletelocation) {
        return {
          data: "Excluído com sucesso!",
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Nenhum dado foi encontrado!" },
          messages: [],
        } as APIResponse;
      }
    } catch (error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { DeleteLocationService };
