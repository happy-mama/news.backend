import { prisma } from "../prisma/prisma.js";
import s3 from "../utils/s3.js";

async function getLastNews() {
  const data = await prisma.news.findMany({
    where: {
      status: "published",
    },
    select: {
      slug: true,
      name: true,
      description: true,
      likes: true,
      dislikes: true,
      source_name: true,
      source_link: true,
      published_at: true,
    },
    orderBy: { published_at: "desc" },
    take: 6,
  });

  if (!data) return null;

  await prisma.news_stats.updateMany({
    where: { news: { slug: { in: data.map((news) => news.slug) } } },
    data: {
      e_look: { increment: 1 },
    },
  });

  return data;
}

async function loadNewsData(slug: string) {
  const news = await prisma.news.findFirst({
    where: {
      slug,
      status: "published",
    },
    select: {
      slug: true,
      name: true,
      description: true,
      likes: true,
      dislikes: true,
      source_name: true,
      source_link: true,
      published_at: true,

      md_file_path: true,
    },
  });

  if (!news) {
    return null;
  }

  const mdFile = await s3.getFileAsText("news.md", news.md_file_path);

  if (!mdFile) {
    return null;
  }

  await prisma.news.update({
    where: { slug },
    data: {
      newsStats: {
        update: {
          e_open: { increment: 1 },
        },
      },
    },
  });

  return {
    ...news,
    md_file_path: undefined,
    md: mdFile,
  };
}

async function rateNews({
  slug,
  type,
}: {
  slug: string;
  type: "like" | "dislike";
}) {
  const data = await prisma.news.update({
    where: {
      slug,
      status: "published",
    },
    data: {
      ...(type == "like"
        ? { likes: { increment: 1 } }
        : { dislikes: { increment: 1 } }),
    },
    select: {
      slug: true,
      likes: true,
      dislikes: true,
    },
  });

  if (!data) return null;

  return data;
}

export default {
  getLastNews,
  loadNewsData,
  rateNews,
};
