import { Router } from "express";

import newsRouter from "./routes/newsRouter.js";
import API_PATH from "./routes/path.js";

const router = Router();

router.use(API_PATH.news.base, newsRouter);

export default router;
