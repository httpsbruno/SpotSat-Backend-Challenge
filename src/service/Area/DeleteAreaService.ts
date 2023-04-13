import { APIResponse } from "../../models/APIResponse";
import { AreaCRUD } from "../../repository/CRUD/Area";

class DeleteAreaService {
  private areacrud = new AreaCRUD();

  public async execute(id: string): Promise<APIResponse> {
    try {
      const deletearea = await this.areacrud.delete(id);

      if (deletearea) {
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

export { DeleteAreaService };
