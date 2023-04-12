import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { PointData } from "../../models/PointData";
import { Operations } from "../../repository/Operations";
import { LocationCRUD } from "../../repository/CRUD/Location";
class DistanceBetweenService {
  private location1 = new LocationCRUD();
  private location2 = new LocationCRUD();
  private operations = new Operations();

  public async execute(
    id1: string,
    id2: string,
    cookie: string
  ): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      const getId1 = await this.location1.getLocationbyId(id1);
      if (!getId1) {
        throw new Error(`404: Erro ao encontrar local 1`);
      }
      const location1 = JSON.parse(getId1) as PointData;

      const getId2 = await this.location2.getLocationbyId(id2);
      if (!getId2) {
        throw new Error(`404: Erro ao encontrar local 2`);
      }
      const location2 = JSON.parse(getId2) as PointData;
    
      const getDistance = await this.operations.distanceBetweenTwoPoints(
        location1,
        location2
      );

      if (getDistance) {
        return {
          data: JSON.parse(getDistance),
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Distância não encontrada" },
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

export { DistanceBetweenService };
