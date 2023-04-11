import { Request, Response } from "express";
import { CreateAreaService } from "../../service/Area/CreateAreaService";
import { ResponseWriter } from "../../utils/response";

class CreateArea {
  private service = CreateAreaService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.body, req.cookies.bearer);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { CreateArea };
