const TIKTOK_HASHTAGS = "\n\n#quitsmoking #smokefree #transformation #fyp #quittok";

/**
 * Adapt an Instagram-style caption for TikTok.
 *
 * Title: first meaningful paragraph stripped of hashtags, max 90 chars.
 * Description: shortened body (hook + turning point + question) with
 * Instagram hashtags replaced by TikTok-native ones.
 */
export function adaptCaptionForTikTok(igCaption: string): {
  title: string;
  description: string;
} {
  const paragraphs = igCaption
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const hook =
    paragraphs[0]
      ?.replace(/#\w+/g, "")
      .trim()
      .slice(0, 90) || "";

  const contentParagraphs = paragraphs.filter((p) => !p.startsWith("#"));

  const shortened =
    contentParagraphs.length <= 3
      ? contentParagraphs.join("\n\n")
      : [
          contentParagraphs[0],
          contentParagraphs[Math.floor(contentParagraphs.length / 2)],
          contentParagraphs[contentParagraphs.length - 1],
        ].join("\n\n");

  const tiktokCaption = shortened
    .replace(/link in bio/gi, "follow for more")
    .replace(/👇/g, "👆");

  return {
    title: hook,
    description: tiktokCaption + TIKTOK_HASHTAGS,
  };
}
