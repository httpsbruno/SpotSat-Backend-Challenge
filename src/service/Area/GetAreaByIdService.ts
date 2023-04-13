import { APIResponse } from "../../models/APIResponse";
import { AreaCRUD } from "../../repository/CRUD/Area";

class GetAreaByIdService {
  private areacrud = new AreaCRUD();

  public async execute(id: string): Promise<APIResponse> {
    try {
      const getbyid = await this.areacrud.getAreabyId(id);

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

export { GetAreaByIdService };
