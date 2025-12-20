import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function successResponse({
  res,
  data,
  code = 1,
  message = "success",
  status = StatusCodes.OK,
}: {
  res: Response;
  data: any;
  code?: number;
  message?: string;
  status?: StatusCodes;
}) {
  res.status(status);

  res.send({
    code,
    message,
    data,
  });
}

export function errorResponse({
  res,
  code = -1,
  message = "error",
  status = StatusCodes.INTERNAL_SERVER_ERROR,
}: {
  res: Response;
  code?: number;
  message?: string;
  status?: StatusCodes;
}) {
  res.status(status);

  res.send({
    code,
    message,
  });
}
