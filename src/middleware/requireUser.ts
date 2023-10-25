import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

/*

Now we can define a middleware to send an error message if the res.locals.user object doesn’t exist.

*/

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return next(
        new AppError(400, `Session has expired or user doesn't exist`)
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
