import { Request, Response } from "express";
import { GetAllLocationService } from "../../service/Location/GetAllLocationService";
import { ResponseWriter } from "../../utils/response";

class GetAllLocation {
  private service = GetAllLocationService;

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

export { GetAllLocation };
