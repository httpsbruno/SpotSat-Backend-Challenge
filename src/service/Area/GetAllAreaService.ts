import { APIResponse } from "../../models/APIResponse";
import { AreaCRUD } from "../../repository/CRUD/Area";

class GetAllAreaService {
  private areacrud = new AreaCRUD();

  public async execute(): Promise<APIResponse> {
    try {
      const getall = await this.areacrud.getAllArea();

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

export { GetAllAreaService };
