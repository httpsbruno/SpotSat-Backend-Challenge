import { APIResponse } from "../../models/APIResponse";
import { Operations } from "../../repository/Operations";

class AreasInCircleService {
  private operations = new Operations();

  public async execute(
    lat: number,
    long: number,
    r: number
  ): Promise<APIResponse> {
    try {
      const getAreasInCircle = await this.operations.areasInCircle(
        lat,
        long,
        r
      );

      if (getAreasInCircle) {
        return {
          data: JSON.parse(getAreasInCircle),
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Nenhum dado encontrado" },
          messages: [],
        } as APIResponse;
      }
    } catch (error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { AreasInCircleService };
