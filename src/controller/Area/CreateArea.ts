import { Request, Response } from "express";
import { CreateAreaService } from "../../service/Area/CreateAreaService";
import { ResponseWriter } from "../../utils/response";

class CreateArea {
  private service = CreateAreaService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const adminName =req.cookies.bearer.payload;
      const response = await new this.service().execute(
        req.body,
        adminName
      );

      this.responseWriter.success(res, 200, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { CreateArea };
