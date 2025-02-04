import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_FORGOT_PASSWORD } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({
      message: "Authentication failed, token is missing",
    });

    return;
  }
  req.path;

  verify(token, JWT_SECRET!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).send({ message: "Token expired" });
        return;
      } else {
        res.status(401).send({ message: "Invalid token" });
        return;
      }
    }

    res.locals.user = payload;

    next();
  });
};
export const verifyTokenReset = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({
      message: "Authentication failed, token is missing",
    });

    return;
  }


  verify(token, JWT_SECRET_FORGOT_PASSWORD!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).send({ message: "Token expired" });
        return;
      } else {
        res.status(401).send({ message: "Invalid token" });
        return;
      }
    }

    res.locals.user = payload;

    next();
  });
};
