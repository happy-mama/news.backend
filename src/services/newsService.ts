import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import newsRepo from "../repos/newsRepo.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { validateStringValues, validateType } from "../utils/validators.js";

async function getLastNews(req: Request, res: Response) {
  const data = await newsRepo.getLastNews();

  if (!data) {
    return errorResponse({
      res,
      message: "News not found",
      status: StatusCodes.NOT_FOUND,
    });
  }

  successResponse({ res, data });
}

async function loadNewsData(req: Request, res: Response) {
  const { slug } = req.params;

  if (!slug) {
    return errorResponse({
      res,
      message: "Slug required",
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const data = await newsRepo.loadNewsData(slug);

  successResponse({ res, data });
}

async function rateNews(req: Request, res: Response) {
  const { slug } = req.params;

  if (!slug) {
    return errorResponse({
      res,
      message: "Slug required",
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const type = validateStringValues({
    allowed: ["like", "dislike"] as const,
    value: req.query.type as string,
  });

  if (!type) {
    return errorResponse({
      res,
      message: "type should be 'like' or 'dislike'",
    });
  }

  const data = await newsRepo.rateNews({ slug, type });

  successResponse({
    res,
    data,
  });
}

// async function createNews(req: Request, res: Response) {
//   const params = req.params;

//   const onError = () => {};

//   validateType({type: "string", value: params.slug});
// }

export default {
  getLastNews,
  loadNewsData,
  rateNews,
};
