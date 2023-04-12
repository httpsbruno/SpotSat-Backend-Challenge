import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { Operations } from "../../repository/Operations";

class AreasInCircleService {
  private operations = new Operations();

  public async execute(
    lat: number,
    long: number,
    r: number,
    cookie: string
  ): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);

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
    }

    return {
      data: {},
      messages: ["an error occurred while token verification"],
    } as APIResponse;
  }
}

export { AreasInCircleService };
