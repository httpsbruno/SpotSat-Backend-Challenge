import { APIResponse } from "../../models/APIResponse";
import { Operations } from "../../repository/Operations";
import { LocationCRUD } from "../../repository/CRUD/Location";
import { AreaCRUD } from "../../repository/CRUD/Area";
import { PolygonData } from "../../models/PolygonData";

class LocationsInAreaService {
  private location = new LocationCRUD();
  private area = new AreaCRUD();
  private operations = new Operations();

  public async execute(areaName: string): Promise<APIResponse> {
    try {
      const getArea = await this.area.getAreabyName(areaName);
      if (!getArea) {
        throw new Error(`404: Erro ao encontrar Area`);
      }
      const area = JSON.parse(getArea) as PolygonData;

      const getLocationsInArea = await this.operations.locationsInArea(area);

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
    } catch (error) {
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { LocationsInAreaService };
