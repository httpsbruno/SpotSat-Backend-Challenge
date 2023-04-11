import { Request, Response } from "express";
import { DeleteAreaService } from "../../service/Area/DeleteAreaService";
import { ResponseWriter } from "../../utils/response";

class DeleteArea {
  private service = DeleteAreaService;

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

export { DeleteArea };