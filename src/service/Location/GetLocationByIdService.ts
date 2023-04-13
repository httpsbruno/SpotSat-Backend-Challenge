import { APIResponse } from "../../models/APIResponse";
import { LocationCRUD } from "../../repository/CRUD/Location";

class GetLocationByIdService {
  private locationcrud = new LocationCRUD();

  public async execute(id: string): Promise<APIResponse> {
    try {
      const getbyid = await this.locationcrud.getLocationbyId(id);

      if (getbyid) {
        return {
          data: JSON.parse(getbyid),
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

export { GetLocationByIdService };
