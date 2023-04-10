import { APIResponse } from "../models/APIResponse";
import { authToken } from "../middleware/auth";

class LocationService {


  public async execute(cookie: string): Promise<APIResponse> {
   
    console.log("Meu cookie: " + cookie);
    if(cookie){
        const checkCookie = authToken.verifyToken(cookie);
        return {
            data: { checkCookie },
            messages: [],
          } as APIResponse;
    }

    return {
      data: {},
      messages: ["an error occurred while token verification"],
    } as APIResponse;
  }
}

export { LocationService };
