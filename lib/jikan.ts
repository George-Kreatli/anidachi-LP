const JIKAN = "https://api.jikan.moe/v4";

const fetchOptions = { next: { revalidate: 86_400 } } as const;

export interface JikanImageUrls {
  jpg: { image_url: string; large_image_url: string; small_image_url: string };
}

export interface JikanGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  type: string;
  episodes: number | null;
  airing: boolean;
  score: number | null;
  synopsis: string;
  members: number;
  images: JikanImageUrls;
  status?: string;
  genres?: JikanGenre[];
}

export interface JikanEpisode {
  mal_id: number;
  title: string;
  episode: number;
}

export interface JikanRecommendation {
  entry: { mal_id: number; title: string; url: string; images: JikanImageUrls };
  votes: number;
}

async function jikanGet<T>(path: string): Promise<T> {
  const res = await fetch(`${JIKAN}${path}`, fetchOptions);
  if (!res.ok) {
    throw new Error(`Jikan ${res.status} ${res.statusText}: ${path}`);
  }
  return res.json() as Promise<T>;
}

/** Top anime by MAL members (useful for content seeding). */
export async function getTopAnimeByMembers(
  limit = 25
): Promise<JikanAnime[]> {
  const data = await jikanGet<{
    data: JikanAnime[];
  }>(`/anime?order_by=members&sort=desc&limit=${limit}`);
  return data.data;
}

export async function getAnimeById(id: number): Promise<JikanAnime> {
  const data = await jikanGet<{ data: JikanAnime }>(`/anime/${id}`);
  return data.data;
}

export async function getAnimeRecommendations(
  id: number
): Promise<JikanRecommendation[]> {
  const data = await jikanGet<{ data: JikanRecommendation[] }>(
    `/anime/${id}/recommendations`
  );
  return data.data;
}

export async function getAnimeEpisodesPage(
  id: number,
  page = 1
): Promise<{ episodes: JikanEpisode[]; lastPage: number }> {
  const data = await jikanGet<{
    data: JikanEpisode[];
    pagination: { last_visible_page: number };
  }>(`/anime/${id}/episodes?page=${page}`);
  return {
    episodes: data.data,
    lastPage: data.pagination.last_visible_page,
  };
}
