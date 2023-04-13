import { APIResponse } from "../../models/APIResponse";
import { Operations } from "../../repository/Operations";

class LocationsInCircleService {
  private operations = new Operations();

  public async execute(
    lat: number,
    long: number,
    r: number
  ): Promise<APIResponse> {
    try {
      const getLocationsInCircle = await this.operations.locationsInCircle(
        lat,
        long,
        r
      );

      if (getLocationsInCircle) {
        return {
          data: JSON.parse(getLocationsInCircle),
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

export { LocationsInCircleService };
