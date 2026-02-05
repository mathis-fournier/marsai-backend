export interface Movie {
  original_title: string;
  english_title: string;
  youtube_url: string;
  cover_image: string;
  duration: number;
  is_hybrid: boolean;
  original_language: string;
  original_synopsis: string;
  english_synopsis: string;
  creative_process: string;
  ia_tools: string;
  has_subs?: boolean;
  srt?: string | null;
  status?: "Pending" | "Cancelled" | "Accepted";
}
