import { APIResponse } from "../../models/APIResponse";
import { authToken } from "../../middleware/auth";
import { PointData } from "../../models/PointData";
import { Operations } from "../../repository/Operations";
import { LocationCRUD } from "../../repository/CRUD/Location";
import { AreaCRUD } from "../../repository/CRUD/Area";
import { PolygonData } from "../../models/PolygonData";

class LocationInAreaService {
  private location = new LocationCRUD();
  private area = new AreaCRUD();
  private operations = new Operations();

  public async execute(
    locationName: string,
    areaName: string,
    cookie: string
  ): Promise<APIResponse> {
    if (cookie) {
      const checkCookie = authToken.verifyToken(cookie);
      const getLocation = await this.location.getLocationbyName(locationName);
      if (!getLocation) {
        throw new Error(`404: Erro ao encontrar Local`);
      }
      const location = JSON.parse(getLocation) as PointData;

      const getArea = await this.area.getAreabyName(areaName);
      if (!getArea) {
        throw new Error(`404: Erro ao encontrar Area`);
      }
      const area = JSON.parse(getArea) as PolygonData;
      
      const getLocationInArea = await this.operations.locationInArea(
        location,
        area
      );
       
      if (getLocationInArea) {
        return {
          data: JSON.parse(getLocationInArea),
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

export { LocationInAreaService };