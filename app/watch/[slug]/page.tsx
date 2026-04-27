import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { animeList, type AnimeEntry } from "@/lib/anime-data";
import { getMalIdForSlug } from "@/lib/anime-mal-ids";
import {
  fetchJikanForWatchPage,
  formatEpisodesForUi,
  formatMembersLine,
  formatScoreLine,
  jikanGenresText,
  jikanStatusLine,
  resolveRelatedFromJikan,
} from "@/lib/jikan-for-watch-page";
import { SeoPageLayout, type TocHeading } from "@/components/seo-page-layout";
import { PrimaryCheckoutCta } from "@/components/primary-checkout-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

function getAnimeBySlug(rawSlug: string): AnimeEntry | undefined {
  const slug = rawSlug.replace(/-with-friends$/, "");
  return animeList.find((a) => a.slug === slug);
}

export async function generateStaticParams() {
  return animeList.map((anime) => ({
    slug: `${anime.slug}-with-friends`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const anime = getAnimeBySlug(rawSlug);
  if (!anime) return {};

  return {
    title: `Watch ${anime.title} with Friends — Create a Watchroom`,
    description: `Watch ${anime.title} together with friends online. Create a Crunchyroll watchroom, sync playback, chat in real-time, and track progress — even asynchronously.`,
    alternates: { canonical: `/watch/${rawSlug}` },
    openGraph: {
      title: `Watch ${anime.title} with Friends | AniDachi`,
      description: `Set up a shared ${anime.title} watchroom on Crunchyroll in seconds.`,
      url: `/watch/${rawSlug}`,
    },
  };
}

function buildToc(
  hasRelated: boolean,
  anime: AnimeEntry
): TocHeading[] {
  const base: TocHeading[] = [
    { id: "series-overview", label: `What is ${anime.title}?`, level: 2 },
    { id: "setup", label: "Step-by-step setup", level: 2 },
    {
      id: "why-async",
      label: `Why ${anime.title} is great to watch with friends`,
      level: 2,
    },
    { id: "discussion-tips", label: "Discussion tips", level: 2 },
  ];
  if (hasRelated) {
    base.push({ id: "related-anime", label: "Related anime", level: 2 });
  }
  base.push({ id: "faq", label: "FAQ", level: 2 });
  return base;
}

export default async function AnimeWithFriendsPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const anime = getAnimeBySlug(rawSlug);
  if (!anime) notFound();

  const malId = getMalIdForSlug(anime.slug);
  const jikanBundle = malId != null ? await fetchJikanForWatchPage(malId) : null;
  const jikan = jikanBundle?.jikanAnime ?? null;
  const fromJikan = resolveRelatedFromJikan(jikanBundle?.recs, anime.slug);
  const relatedAnime =
    fromJikan.length > 0
      ? fromJikan
      : (anime.related
          .map((s) => animeList.find((a) => a.slug === s))
          .filter(Boolean) as AnimeEntry[]);

  const relatedSourceLabel =
    fromJikan.length > 0
      ? "Picked from MyAnimeList recommendations (matched to our guides)."
      : "Curated for fans of the same kind of show.";

  const episodesDisplay = formatEpisodesForUi(jikan, anime.episodes);
  const scoreLine = formatScoreLine(jikan);
  const membersLine = formatMembersLine(jikan);
  const statusLine = jikanStatusLine(jikan);
  const genresDisplay = jikanGenresText(jikan, anime.genres);

  const faq = [
    {
      question: `Does ${anime.title} have a watch party feature on Crunchyroll?`,
      answer: `Crunchyroll does not offer a first-party, built-in "watch with friends" room like some other services. You can still watch with friends by using a third-party tool: install AniDachi, play ${anime.title} in your own Crunchyroll tab, and join the same AniDachi watchroom for synced playback and group chat (live or async).`,
    },
    {
      question: `Can I watch ${anime.title} with friends asynchronously?`,
      answer: `Yes. AniDachi watchrooms for ${anime.title} work when everyone is online at the same time and when you are on different schedules. Mark episodes, leave reactions, and catch up on others' messages without a shared calendar block.`,
    },
    {
      question: `Do all my friends need Crunchyroll to watch ${anime.title} together?`,
      answer: `Yes—each person who watches needs their own active Crunchyroll subscription to stream the video. AniDachi adds the room, chat, and progress sync; it is not a replacement for Crunchyroll's catalog.`,
    },
  ];

  const genreBits = (jikan?.genres?.length
    ? jikanGenresText(jikan, anime.genres)
    : anime.genres.join(", ")
  )
    .split(", ")
    .slice(0, 2)
    .join(" and ")
    .toLowerCase();

  return (
    <SeoPageLayout
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Watch Anime Together", url: "/watch-anime-together" },
        { name: anime.title, url: `/watch/${rawSlug}` },
      ]}
      title={`Watch ${anime.title} with Friends — AniDachi Watchrooms`}
      description={`Create a shared ${anime.title} watchroom on Crunchyroll. Sync, chat, and track progress with friends—async when you need it.`}
      url={`/watch/${rawSlug}`}
      datePublished="2026-04-23"
      dateModified="2026-04-24"
      faq={faq}
      headings={buildToc(relatedAnime.length > 0, anime)}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Watch {anime.title} with Friends — AniDachi Watchrooms
      </h1>

      <p className="text-xl text-gray-700 leading-relaxed mb-8">
        <strong>
          {(() => {
            const s = anime.synopsis.trim();
            const first = s.split(/(?<=[.!?])\s+/)[0] ?? s;
            return (
              <>
                {first}
                {/[!?.]$/.test(first) ? "" : "."} Watching {anime.title} in an
                AniDachi watchroom lets your group react on the big twists and
                cliffhangers together—live or on your own schedule.
              </>
            );
          })()}
        </strong>
      </p>

      <PrimaryCheckoutCta
        pagePath={`/watch/${rawSlug}`}
        pageTemplate="anime"
        placement="content_mid"
        className="!mt-0 mb-10"
      />

      <div id="series-overview" className="bg-gray-50 rounded-lg p-6 mb-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is {anime.title}?
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {anime.japaneseTitle && (
            <div>
              <span className="text-gray-500">Japanese title</span>
              <p className="font-medium text-gray-900">{anime.japaneseTitle}</p>
            </div>
          )}
          <div>
            <span className="text-gray-500">Episodes</span>
            <p className="font-medium text-gray-900">{episodesDisplay}</p>
          </div>
          {statusLine && (
            <div>
              <span className="text-gray-500">Airing status</span>
              <p className="font-medium text-gray-900">{statusLine}</p>
            </div>
          )}
          {scoreLine && (
            <div>
              <span className="text-gray-500">Score</span>
              <p className="font-medium text-gray-900">{scoreLine}</p>
            </div>
          )}
          {membersLine && (
            <div>
              <span className="text-gray-500">Popularity</span>
              <p className="font-medium text-gray-900">{membersLine}</p>
            </div>
          )}
          <div>
            <span className="text-gray-500">Genres</span>
            <p className="font-medium text-gray-900">
              {genresDisplay}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Platform</span>
            <p className="font-medium text-gray-900">Crunchyroll</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-3">
          Episode count, status, and scores are from MyAnimeList (via the Jikan
          API) and refresh about once a day. If the service is slow, the site
          falls back to our written summary.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4 text-base">{anime.synopsis}</p>
      </div>

      <h2
        id="setup"
        className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24"
      >
        How to Watch {anime.title} Together
      </h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-8">
        <li>Install the AniDachi Chrome extension from the product site.</li>
        <li>
          Open {anime.title} on Crunchyroll, then use AniDachi to
          &quot;Detect Anime&quot; for this show.
        </li>
        <li>
          Create a watchroom for {anime.title} and share the invite link in your
          group chat or Discord.
        </li>
        <li>
          Start the same episode together for live sync, or use async
          catch-up: reactions stay attached to the episode for late viewers.
        </li>
        <li>
          Mark what you have watched and skim friends&apos; notes before you
          press play on the next episode.
        </li>
      </ol>

      <h2
        id="why-async"
        className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24"
      >
        Why {anime.title} Is Perfect to Watch with Friends
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        With {episodesDisplay} to work through, {anime.title} rewards a
        watchroom that respects real life. The {genreBits} mix means
        cliffhangers and emotional swings show up often enough that async chat
        stays lively—no one has to sit through a four-hour call to stay in sync.
      </p>

      <h2
        id="discussion-tips"
        className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24"
      >
        {anime.title} discussion tips
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
        <li>Agree on sub vs. dub for the room so reactions line up with audio.</li>
        <li>
          Use &quot;no spoilers past episode N&quot; in the room title when
          someone is behind.
        </li>
        <li>
          Drop short reaction notes right after the cold open and before the
          credits—those are the beats people replay.
        </li>
        <li>Save big lore debates for after the eyecatch to avoid late joins getting spoiled.</li>
      </ul>

      {relatedAnime.length > 0 && (
        <>
          <h2
            id="related-anime"
            className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24"
          >
            Related anime
          </h2>
          <p className="text-sm text-gray-600 mb-3">{relatedSourceLabel}</p>
          <ul className="space-y-2 text-purple-600 mb-8">
            {relatedAnime.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/watch/${related.slug}-with-friends`}
                  className="hover:underline"
                >
                  Watch {related.title} with friends
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </SeoPageLayout>
  );
}
