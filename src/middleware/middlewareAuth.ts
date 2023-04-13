import { Request, Response, NextFunction } from "express";
import { ResponseWriter } from "../utils/response";
import { authToken } from "./auth";
class Auth {
  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
    const cookie = req.cookies.bearer;
      if(cookie){
        const checkCookie = authToken.verifyToken(cookie);
        if (checkCookie.payload){
            next();
        }
      } else {
        throw new Error("404: an error occurred while token verification");
      }
        
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { Auth };