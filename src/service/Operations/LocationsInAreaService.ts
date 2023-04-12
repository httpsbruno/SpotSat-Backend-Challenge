import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { Operations } from "../../repository/Operations";
import { LocationCRUD } from "../../repository/CRUD/Location";
import { AreaCRUD } from "../../repository/CRUD/Area";
import { PolygonData } from "../../models/PolygonData";

class LocationsInAreaService {
  private location = new LocationCRUD();
  private area = new AreaCRUD();
  private operations = new Operations();

  public async execute(
    areaName: string,
    cookie: string
  ): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
     

      const getArea = await this.area.getAreabyName(areaName);
      if (!getArea) {
        throw new Error(`404: Erro ao encontrar Area`);
      }
      const area = JSON.parse(getArea) as PolygonData;
    
      const getLocationsInArea = await this.operations.locationsInArea(
        area
      );

      if (getLocationsInArea) {
        return {
          data: JSON.parse(getLocationsInArea),
          messages: [],
        } as APIResponse;
      } else {
        return {
          data: { status: "Nenhum local encontrado" },
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

export { LocationsInAreaService };