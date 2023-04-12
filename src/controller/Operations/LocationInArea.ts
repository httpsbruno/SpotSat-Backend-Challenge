import { Request, Response } from "express";
import { LocationInAreaService } from "../../service/Operations/LocationInAreaService";
import { ResponseWriter } from "../../utils/response";

class LocationInArea {
  private service = LocationInAreaService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const { locationName , areaName } = req.params; 
 
      const response = await new this.service().execute(locationName,areaName, req.cookies.bearer);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { LocationInArea };