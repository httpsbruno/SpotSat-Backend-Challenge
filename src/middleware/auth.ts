import { NextFunction, Request, Response } from 'express';
import { sign, verify, Secret } from 'jsonwebtoken';
import { config } from "../config";
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { apiResponseBuilder } from '../responses/APIResponseBuilder';

class AuthToken
{
    public readonly tokenExpirationTime = 60 * 60 * 24;

    generateToken (payload: string | object | Buffer)
    {
        return sign({ payload }, config.JWT_KEY as Secret, { expiresIn: this.tokenExpirationTime });
    }

    verifyToken (token: string)
    {
        try
        {
            return verify(token, config.JWT_KEY as Secret) as { payload: string };
        }
        catch (error: any)
        {
            throw new UnauthorizedError('Token Invalid/Expired.');
        }
    }

    verifyTokenMiddleWare (req: Request, res: Response, next: NextFunction)
    {
        try
        {
            this.verifyToken(req.cookies.bearer);
            next();
        }
        catch (error: any)
        {
            const apiResponse = apiResponseBuilder.writeErrorResponse(error);

            return res.status(apiResponse.code).json(apiResponse);
        }
    }
}

const authToken = new AuthToken();
export { authToken };