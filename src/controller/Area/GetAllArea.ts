import { Request, Response } from "express";
import { GetAllAreaService } from "../../service/Area/GetAllAreaService";
import { ResponseWriter } from "../../utils/response";

class GetAllArea {
  private service = GetAllAreaService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute();

      this.responseWriter.success(res, 200, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { GetAllArea };
