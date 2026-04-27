export interface GuideLinkItem {
  href: string;
  label: string;
  tags: string[];
}

export const guideLinks: GuideLinkItem[] = [
  {
    href: "/guides/how-to-watch-anime-with-friends-online",
    label: "How to Watch Anime With Friends Online",
    tags: ["template-c", "how-to-core", "online", "pillar-watch-anime"],
  },
  {
    href: "/guides/how-to-watch-anime-long-distance",
    label: "How to Watch Anime Long Distance",
    tags: ["template-c", "how-to-core", "long-distance", "pillar-watch-anime"],
  },
  {
    href: "/guides/how-to-watch-anime-with-friends-in-different-time-zones",
    label: "How to Watch Anime With Friends in Different Time Zones",
    tags: ["template-c", "how-to-core", "time-zones", "pillar-watch-anime"],
  },
  {
    href: "/guides/how-to-watch-anime-without-spoilers",
    label: "How to Watch Anime Without Spoilers",
    tags: ["template-c", "how-to-core", "spoilers", "pillar-watch-anime"],
  },
  {
    href: "/guides/how-to-create-an-anime-watch-party",
    label: "How to Create an Anime Watch Party",
    tags: ["template-c", "how-to-core", "watch-party", "pillar-watch-anime"],
  },
  {
    href: "/guides/how-to-watch-crunchyroll-with-friends",
    label: "How to Watch Crunchyroll with Friends",
    tags: ["template-c", "crunchyroll", "pillar-watch-crunchyroll"],
  },
  {
    href: "/guides/crunchyroll-watch-party-chrome-extension",
    label: "Best Crunchyroll Watch Party Chrome Extensions",
    tags: ["template-c", "crunchyroll", "pillar-watch-crunchyroll"],
  },
  {
    href: "/guides/anime-watch-party-ideas",
    label: "Anime Watch Party Ideas",
    tags: ["template-c", "watch-party", "pillar-watch-anime"],
  },
  {
    href: "/guides/asynchronous-vs-live-watch-party",
    label: "Async vs Live Watch Parties",
    tags: [
      "template-c",
      "async",
      "time-zones",
      "pillar-watch-anime",
      "pillar-watch-crunchyroll",
    ],
  },
  {
    href: "/guides/best-anime-to-watch-with-friends",
    label: "Best Anime to Watch with Friends",
    tags: ["template-d", "listicle", "pillar-watch-anime"],
  },
];

export function getGuideLinks({
  includeTags,
  excludeHref,
  limit,
}: {
  includeTags?: string[];
  excludeHref?: string;
  limit?: number;
} = {}): GuideLinkItem[] {
  const filtered = guideLinks.filter((item) => {
    if (excludeHref && item.href === excludeHref) return false;
    if (!includeTags || includeTags.length === 0) return true;
    return includeTags.some((tag) => item.tags.includes(tag));
  });

  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}
