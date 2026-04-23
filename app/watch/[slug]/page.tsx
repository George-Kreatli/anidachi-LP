import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { animeList, type AnimeEntry } from "@/lib/anime-data";
import { SeoPageLayout } from "@/components/seo-page-layout";

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

export default async function AnimeWithFriendsPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const anime = getAnimeBySlug(rawSlug);
  if (!anime) notFound();

  const relatedAnime = anime.related
    .map((s) => animeList.find((a) => a.slug === s))
    .filter(Boolean) as AnimeEntry[];

  const faq = [
    {
      question: `How do I watch ${anime.title} with friends online?`,
      answer: `Install the AniDachi Chrome extension, navigate to ${anime.title} on Crunchyroll, click "Detect Anime," create a watchroom, and share the invite link with friends. You can watch together in real-time or asynchronously.`,
    },
    {
      question: `Can I watch ${anime.title} with friends asynchronously?`,
      answer: `Yes! With AniDachi, you create a watchroom for ${anime.title} and each person watches at their own pace. Mark episodes as watched, leave reactions, and read friends' comments when you catch up.`,
    },
    {
      question: `Do all my friends need Crunchyroll to watch ${anime.title} together?`,
      answer: `Yes, each person needs their own Crunchyroll account to stream ${anime.title}. AniDachi provides the watchroom, playback sync, and chat on top.`,
    },
    {
      question: `How many episodes does ${anime.title} have?`,
      answer: `${anime.title} has ${anime.episodes}.`,
    },
  ];

  return (
    <SeoPageLayout
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Watch Anime Together", url: "/watch-anime-together" },
        { name: anime.title, url: `/watch/${rawSlug}` },
      ]}
      title={`Watch ${anime.title} with Friends`}
      description={`Create a shared ${anime.title} watchroom on Crunchyroll.`}
      url={`/watch/${rawSlug}`}
      datePublished="2026-04-23"
      dateModified="2026-04-23"
      faq={faq}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Watch {anime.title} with Friends
      </h1>

      <p className="text-xl text-gray-700 leading-relaxed mb-8">
        <strong>
          Create a shared {anime.title} watchroom on Crunchyroll using AniDachi.
          Sync playback, chat in real-time, and track everyone&apos;s progress
          — even if you watch at different times.
        </strong>
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {anime.japaneseTitle && (
            <div>
              <span className="text-gray-500">Japanese Title</span>
              <p className="font-medium text-gray-900">{anime.japaneseTitle}</p>
            </div>
          )}
          <div>
            <span className="text-gray-500">Episodes</span>
            <p className="font-medium text-gray-900">{anime.episodes}</p>
          </div>
          <div>
            <span className="text-gray-500">Genres</span>
            <p className="font-medium text-gray-900">
              {anime.genres.join(", ")}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Platform</span>
            <p className="font-medium text-gray-900">Crunchyroll</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
        About {anime.title}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">{anime.synopsis}</p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
        How to Watch {anime.title} Together
      </h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-8">
        <li>Install the AniDachi Chrome extension.</li>
        <li>
          Open {anime.title} on Crunchyroll and click &quot;Detect Anime.&quot;
        </li>
        <li>Create a watchroom and share the invite link with friends.</li>
        <li>
          Watch together with synced playback — or watch asynchronously and
          leave reactions for friends.
        </li>
        <li>
          Mark episodes as watched and track everyone&apos;s progress in the
          watchroom.
        </li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
        Why {anime.title} Is Great to Watch with Friends
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        {anime.title} is one of the most popular anime to watch with friends
        thanks to its {anime.genres.slice(0, 2).join(" and ").toLowerCase()}{" "}
        elements. Every episode gives you something to discuss, react to, and
        debate. Whether you&apos;re watching for the first time or rewatching
        with a friend who hasn&apos;t seen it, a shared watchroom makes the
        experience unforgettable.
      </p>

      {relatedAnime.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Similar Anime to Watch Together
          </h2>
          <ul className="space-y-2 text-purple-600 mb-8">
            {relatedAnime.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/watch/${related.slug}-with-friends`}
                  className="hover:underline"
                >
                  Watch {related.title} with Friends
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </SeoPageLayout>
  );
}
