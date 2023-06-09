import { Request, Response } from 'express';
import { LoginService } from '../service/Login';
import { ResponseWriter } from '../utils/response';

class Login {
  private service = LoginService;

  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.body);
      
      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { Login };