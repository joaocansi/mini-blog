import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../../../../shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.cookies.user_token;
  if (!bearerToken) {
    throw new AppError('Token is missing', 401);
  }  

  try {
    const verifyToken = verify(bearerToken, process.env.SECRET_KEY);
    const decodeToken = verifyToken as TokenPayload;

    req.user = {
      id: decodeToken.sub
    }
    next();
  } catch (error) {
    throw new AppError('Token is not valid', 401);
  }
}

export default ensureAuthenticated;