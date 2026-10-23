import { toStatus } from "@/components/StatusCell";
import type { Browser, Category, Status } from "@/data/types";

export type BrowserSummary = {
  browser: Browser;
  counts: Record<Status, number>;
  total: number;
  /** Yes = 1 point, partial = ½, no/unknown = 0. */
  score: number;
  /** Features this browser only partially supports or lacks. */
  gaps: { feature: string; status: Status }[];
};

export function summarize(
  browsers: readonly Browser[],
  categories: readonly Category[],
): BrowserSummary[] {
  const features = categories.flatMap((c) => c.features);

  return browsers.map((browser) => {
    const counts: Record<Status, number> = { yes: 0, partial: 0, no: 0, unknown: 0 };
    const gaps: BrowserSummary["gaps"] = [];

    for (const feature of features) {
      const { status } = toStatus(feature.values[browser.id]);
      counts[status]++;

      if (status === "no" || status === "partial") gaps.push({ feature: feature.name, status });
    }

    const score = counts.yes + counts.partial / 2;
    return { browser, counts, total: features.length, score, gaps };
  });
}

/** Highest score first; ties go to the browser with fewer "no"s, then data order. */
export function byScore(a: BrowserSummary, b: BrowserSummary) {
  return b.score - a.score || a.counts.no - b.counts.no;
}
