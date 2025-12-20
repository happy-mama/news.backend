import { prisma } from "../prisma/prisma.js";

async function getLastNews() {
  return await prisma.news.findMany({
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
      md_file_path: true,

      published_at: true,
    },
    orderBy: { published_at: "desc" },
    take: 6,
  });
}

export default {
  getLastNews,
};
