type NewsSourceName = "openNET";

type NewsStatus = "draft" | "published" | "hidden";

interface News {
  id: number;
  slug: string;
  name: string;
  description: string;
  source_name: NewsSourceName;
  source_link: string;
  md_file_path: string;
  likes: number;
  dislikes: number;
  stats_id: number;
  created_at: Date;
  updated_at: Date;
  status: NewsStatus;
  published_at: Date;
}

interface NewsStats {
  id: number;

  e_open: number;
  e_look: number;
  e_bounce: number;

  t_1min: number;
  t_2min: number;
  t_3min: number;
  t_5min: number;
  t_10min: number;
  t_total: number;

  p_25: number;
  p_50: number;
  p_75: number;
  p_100: number;

  sf_main: number;
  sf_search: number;
  sf_another: number;

  updated_at: Date;
}
