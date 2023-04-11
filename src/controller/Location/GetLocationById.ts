import { Request, Response } from "express";
import { GetLocationByIdService } from "../../service/Location/GetLocationByIdService";
import { ResponseWriter } from "../../utils/response";

class GetLocationById {
  private service = GetLocationByIdService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.params.id, req.cookies.bearer);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { GetLocationById };