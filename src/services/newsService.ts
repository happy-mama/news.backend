import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import newsRepo from "../repos/newsRepo.js";
import { errorResponse, successResponse } from "../utils/response.js";
import s3 from "../utils/s3.js";

async function getLastNews({ req, res }: { req: Request; res: Response }) {
  const data = await newsRepo.getLastNews();

  if (!data) {
    return errorResponse({
      res,
      message: "News not found",
      status: StatusCodes.NOT_FOUND,
    });
  }

  const mdFiles = await Promise.all(
    data.map((news) => s3.getFileAsText("news.md", news.md_file_path)),
  );

  successResponse({
    res,
    data: data.map(({ md_file_path, ...news }, i) => ({
      ...news,
      md: mdFiles[i],
    })),
  });
}

export default {
  getLastNews,
};
