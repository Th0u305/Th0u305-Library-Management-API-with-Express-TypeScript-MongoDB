import { Request, Response } from "express";

export const errorHandler = (err: any, res: Response, req: Request) => {
  return res.status(400).json({
    message: "Validation failed",
    success: false,
    error: {
      name: "ValidationError",
      errors: err?.errors?.reduce((acc: any, err: any) => {
        const path = err?.path?.join(".");
        acc[path] = {
          properties: {
            message: err?.message,
            type: err?.type,
            min: err?.minimum,
          },
          kind: err?.type,
          path: err?.path[0],
          value: req?.body?.[err?.path[0]] || err?.path[0],
        };
        return acc;
      }, {} as any),
    },
  });
};

export const defaultError = (err: any, res: Response) => {
  return res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: err.message || err,
  });
};
