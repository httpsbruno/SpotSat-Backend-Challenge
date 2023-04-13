import { Request, Response } from "express";
import { DeleteLocationService } from "../../service/Location/DeleteLocationService";
import { ResponseWriter } from "../../utils/response";

class DeleteLocation {
  private service = DeleteLocationService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.params.id);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { DeleteLocation };