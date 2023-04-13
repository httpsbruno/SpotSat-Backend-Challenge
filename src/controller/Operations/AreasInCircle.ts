import { Request, Response } from "express";
import { AreasInCircleService } from "../../service/Operations/AreasInCircleService";
import { ResponseWriter } from "../../utils/response";

class AreasInCircle {
  private service = AreasInCircleService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const { latitude, longitude, raio } = req.query;

      const response = await new this.service().execute(
        Number(latitude),
        Number(longitude),
        Number(raio)
      );

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { AreasInCircle };
