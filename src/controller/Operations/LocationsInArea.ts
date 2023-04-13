import { Request, Response } from "express";
import { LocationsInAreaService } from "../../service/Operations/LocationsInAreaService";
import { ResponseWriter } from "../../utils/response";

class LocationsInArea {
  private service = LocationsInAreaService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const { areaName } = req.params;

      const response = await new this.service().execute(areaName);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { LocationsInArea };
