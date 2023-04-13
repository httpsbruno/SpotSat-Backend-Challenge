import { APIResponse } from "../models/APIResponse";
import { LoginData } from "../models/LoginData";
import { UsernameValidator } from "../validators/username";
import { PasswordValidator } from "../validators/password";
import { authToken } from "../middleware/auth";
class LoginService {
  private username = UsernameValidator;
  private password = PasswordValidator;

  public async execute(login: LoginData): Promise<APIResponse> {
    const checkUsername = new this.username(login.username);

    if (checkUsername.errors) {
      throw new Error(`400: ${checkUsername.errors}`);
    }

    const checkPassword = new this.password(login.password);

    if (checkPassword.errors) {
      throw new Error(`400: ${checkPassword.errors}`);
    }

    const token = authToken.generateToken(login.username);

    if (login.username === "Bruno" && login.password === "1234") {
      return {
        data: { login: "sucesfull", token },
        messages: [],
      } as APIResponse;
    }

    return {
      data: {},
      messages: ["an error occurred while doing login"],
    } as APIResponse;
  }
}

export { LoginService };
