import { Request, Response } from "express";
import { DistanceBetweenService } from "../../service/Operations/DistanceBetweenService";
import { ResponseWriter } from "../../utils/response";

class DistanceBetween {
  private service = DistanceBetweenService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const { id1, id2 } = req.params;

      const response = await new this.service().execute(id1, id2);

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { DistanceBetween };
