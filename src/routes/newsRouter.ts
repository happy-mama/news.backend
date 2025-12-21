import { Router } from "express";
import API_PATH from "./path.js";
import newsService from "../services/newsService.js";

const router = Router({
  mergeParams: true,
});

router.get(API_PATH.news.getLastNews, newsService.getLastNews);

router.get(API_PATH.news.loadNewsData, newsService.loadNewsData);

router.post(API_PATH.news.rateNews, newsService.rateNews);

export default router;
