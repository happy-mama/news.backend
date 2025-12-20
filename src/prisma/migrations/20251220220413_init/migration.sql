-- CreateEnum
CREATE TYPE "news_source_name" AS ENUM ('openNET');

-- CreateEnum
CREATE TYPE "news_status" AS ENUM ('draft', 'published', 'hidden');

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "source_name" "news_source_name",
    "source_link" TEXT NOT NULL DEFAULT '',
    "md_file_path" TEXT NOT NULL DEFAULT '',
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "stats_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "status" "news_status" NOT NULL DEFAULT 'hidden',
    "published_at" TIMESTAMP(3),

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_stats" (
    "id" SERIAL NOT NULL,
    "e_open" INTEGER NOT NULL DEFAULT 0,
    "e_look" INTEGER NOT NULL DEFAULT 0,
    "e_bounce" INTEGER NOT NULL DEFAULT 0,
    "t_1min" INTEGER NOT NULL DEFAULT 0,
    "t_2min" INTEGER NOT NULL DEFAULT 0,
    "t_3min" INTEGER NOT NULL DEFAULT 0,
    "t_5min" INTEGER NOT NULL DEFAULT 0,
    "t_10min" INTEGER NOT NULL DEFAULT 0,
    "t_total" INTEGER NOT NULL DEFAULT 0,
    "p_25" INTEGER NOT NULL DEFAULT 0,
    "p_50" INTEGER NOT NULL DEFAULT 0,
    "p_75" INTEGER NOT NULL DEFAULT 0,
    "p_100" INTEGER NOT NULL DEFAULT 0,
    "sf_main" INTEGER NOT NULL DEFAULT 0,
    "sf_search" INTEGER NOT NULL DEFAULT 0,
    "sf_another" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "news_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "news_stats_id_key" ON "news"("stats_id");

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "news_stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
