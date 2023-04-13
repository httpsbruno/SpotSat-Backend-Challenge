import { Request, Response } from "express";
import { UpdateAreaService } from "../../service/Area/UpdateAreaService";
import { ResponseWriter } from "../../utils/response";

class UpdateArea {
  private service = UpdateAreaService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const adminName = req.cookies.bearer.payload;
      const response = await new this.service().execute(
        req.params.id,
        req.body,
        adminName
      );

      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { UpdateArea };
