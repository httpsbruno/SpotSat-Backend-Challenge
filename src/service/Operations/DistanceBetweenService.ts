import { APIResponse } from "../../models/APIResponse";
import { Operations } from "../../repository/Operations";
import { LocationCRUD } from "../../repository/CRUD/Location";
import { GeometryData } from "../../models/GeometryData";

class DistanceBetweenService {
  private location1 = new LocationCRUD();
  private location2 = new LocationCRUD();
  private operations = new Operations();

  public async execute(
    id1: string,
    id2: string,
  ): Promise<APIResponse> {
    try {

      const getId1 = await this.location1.getLocationbyId(id1);
      if (!getId1) {
        throw new Error(`404: Erro ao encontrar local 1`);
      }
      const location1 = JSON.parse(getId1) as GeometryData;

      const getId2 = await this.location2.getLocationbyId(id2);
      if (!getId2) {
        throw new Error(`404: Erro ao encontrar local 2`);
      }
      const location2 = JSON.parse(getId2) as GeometryData;
      
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

    catch(error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { DistanceBetweenService };
