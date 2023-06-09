import { Response } from "express";
import { APIResponse } from "../models/APIResponse";
import { authToken } from "../middleware/auth";

class ResponseWriter {
  public static error(res: Response, error: Error): void {
    const [statusCode, messages] = error.message.split(": ");

    if (Number(statusCode)) {
      res.status(Number(statusCode)).json({
        data: {},
        messages: messages
          .split("|")
          .filter((message: string) => message !== ""),
      } as APIResponse);
    } else {
      res.status(500).json({
        data: {},
        messages: ["unexpected error occurred"],
      } as APIResponse);
    }
  }

  public static success(
    res: Response,
    statusCode: number,
    response: APIResponse
  ): void {
    if (response.data.token) {
      res
        .status(statusCode)
        .cookie("bearer", response.data.token, {
          secure: false,
          sameSite: true,
          httpOnly: true,
          maxAge: authToken.tokenExpirationTime * 1000,
        }).json(response);
    } else {
      res.status(statusCode).json(response);
    }
  }
}

export { ResponseWriter };
