import { APIResponse } from "../../models/APIResponse";
import { LocationCRUD } from "../../repository/CRUD/Location";
class GetAllLocationService {
  private locationcrud = new LocationCRUD();

  public async execute(): Promise<APIResponse> {
    try {
      const getall = await this.locationcrud.getAllLocation();

      if (getall) {
        return {
          data: JSON.parse(getall),
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

export { GetAllLocationService };
