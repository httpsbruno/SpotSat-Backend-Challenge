import { Request, Response } from "express";
import { GetAreaByIdService } from "../../service/Area/GetAreaByIdService";
import { ResponseWriter } from "../../utils/response";

class GetAreaById {
  private service = GetAreaByIdService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.params.id);

      this.responseWriter.success(res, 200, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { GetAreaById };