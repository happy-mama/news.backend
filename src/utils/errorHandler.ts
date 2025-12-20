import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  const status =
    err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    code: -1,
    message: err.message || "Internal Server Error",
  } as GRes<any>);
}
