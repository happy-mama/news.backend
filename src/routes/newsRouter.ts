import { Router } from "express";
import API_PATH from "./path.js";
import newsService from "../services/newsService.js";

const router = Router({
  mergeParams: true,
});

router.get(API_PATH.news.getLastNews, newsService.getLastNews);

// router.get(API_PATH.news.openNews);

export default router;
