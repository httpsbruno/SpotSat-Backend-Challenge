import { Request, Response } from "express";
import { LocationService } from "../service/LocationService";
import { ResponseWriter } from "../utils/response";

class LocationTest {
  private service = LocationService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.cookies.bearer);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { LocationTest };
