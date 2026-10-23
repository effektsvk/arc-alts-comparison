import { byScore, type BrowserSummary } from "@/lib/summary";
import { BrowserName } from "./BrowserName";
import { StatusIcon, statusMeta, statusOrder } from "./StatusCell";

function BreakdownBar({ counts, total }: Pick<BrowserSummary, "counts" | "total">) {
  return (
    <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
      {statusOrder.map((status) =>
        counts[status] > 0 ? (
          <div
            key={status}
            className={statusMeta[status].bar}
            style={{ width: `${(counts[status] / total) * 100}%` }}
            title={`${statusMeta[status].label}: ${counts[status]}`}
          />
        ) : null,
      )}
    </div>
  );
}

function Scorecard({ summary }: { summary: BrowserSummary }) {
  const { browser, counts, total, score, gaps } = summary;
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold tracking-tight">
          <BrowserName browser={browser} />
        </h3>
        <span
          className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400"
          title="Yes = 1 point, Partial = ½"
        >
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{score}</span> / {total}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <BreakdownBar counts={counts} total={total} />
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          {statusOrder.map((status) => (
            <span key={status} className="tabular-nums">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{counts[status]}</span>{" "}
              {statusMeta[status].label.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Gaps
        </span>
        {counts.unknown === total ? (
          <span className="text-sm text-zinc-400 dark:text-zinc-500">Not tested yet</span>
        ) : gaps.length === 0 ? (
          counts.unknown > 0 ? (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              None so far, {counts.unknown} untested
            </span>
          ) : (
            <span className="text-sm text-emerald-600 dark:text-emerald-400">No gaps</span>
          )
        ) : (
          <ul className="flex flex-col gap-1.5">
            {gaps.map((gap) => (
              <li key={gap.feature} className="flex items-start gap-2 text-sm">
                <span className="scale-[0.8]">
                  <StatusIcon status={gap.status} />
                </span>
                <span className="pt-0.5 leading-snug">{gap.feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Scorecards({ summaries }: { summaries: BrowserSummary[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
      {summaries.toSorted(byScore).map((summary) => (
        <Scorecard key={summary.browser.id} summary={summary} />
      ))}
    </div>
  );
}
