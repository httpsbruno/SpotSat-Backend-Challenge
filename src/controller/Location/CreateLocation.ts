import { Request, Response } from "express";
import { CreateLocationService } from "../../service/Location/CreateLocationService";
import { ResponseWriter } from "../../utils/response";

class CreateLocation {
  private service = CreateLocationService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const adminName = req.cookies.bearer.payload;
      const response = await new this.service().execute(
        req.body,
        adminName
      );

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { CreateLocation };
