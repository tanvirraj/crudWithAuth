import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

/*

Defining the schemas alone is not enough. We need a middleware that will parse the schemas and return error messages to the user.

*/

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
