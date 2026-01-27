export interface Movie {
  original_title: string;
  english_title: string;
  youtube_url: string;
  cover_image: string;
  duration: number;
  isHybrid: boolean;
  original_language: string;
  original_synopsis: string;
  english_synopsis: string;
  creative_process: string;
  ia_tools: string;
  hasSubs?: boolean;
  srt?: string | null;
  status?: "Pending" | "Cancelled" | "Accepted";
  user_id: number;
}
