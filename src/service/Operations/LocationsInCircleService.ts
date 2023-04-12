import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { Operations } from "../../repository/Operations";

class LocationsInCircleService {
  private operations = new Operations();

  public async execute(
    lat: number,
    long: number,
    r: number,
    cookie: string
  ): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);

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
    }

    return {
      data: {},
      messages: ["an error occurred while token verification"],
    } as APIResponse;
  }
}

export { LocationsInCircleService };