/** Stable URL fragment ids for in-page TOC (HTML id rules). */
export function headingToAnchorId(heading: string, used: Set<string>): string {
  let base = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!base) base = "section";
  let id = base;
  let n = 0;
  while (used.has(id)) {
    n += 1;
    id = `${base}-${n}`;
  }
  used.add(id);
  return id;
}
