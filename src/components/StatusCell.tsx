import type { Cell, Status } from "@/data/types";

export const statusOrder: Status[] = ["yes", "partial", "no", "unknown"];

export const statusMeta: Record<
  Status,
  { label: string; icon: string; bar: string; cellTint: string }
> = {
  yes: {
    label: "Yes",
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
    cellTint: "",
  },
  partial: {
    label: "Partial",
    icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    bar: "bg-amber-400",
    cellTint: "bg-amber-500/[0.06]",
  },
  no: {
    label: "No",
    icon: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    bar: "bg-rose-500",
    cellTint: "bg-rose-500/[0.07]",
  },
  unknown: {
    label: "Unknown",
    icon: "bg-zinc-500/10 text-zinc-400 dark:text-zinc-500",
    bar: "bg-zinc-300 dark:bg-zinc-700",
    cellTint: "",
  },
};

export function toStatus(cell: Cell = "unknown"): { status: Status; note?: string } {
  return typeof cell === "string" ? { status: cell } : cell;
}

function Glyph({ status }: { status: Status }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "size-3.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (status) {
    case "yes":
      return (
        <svg {...common}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "no":
      return (
        <svg {...common}>
          <path d="M7 7l10 10M17 7L7 17" />
        </svg>
      );
    case "partial":
      return (
        <svg {...common}>
          <path d="M6 12h12" />
        </svg>
      );
    case "unknown":
      return (
        <svg {...common} strokeWidth={2.75}>
          <path d="M8.5 8.5a3.5 3.5 0 1 1 4.6 3.3c-.7.3-1.1.9-1.1 1.6v.6" />
          <path d="M12 18.5h.01" />
        </svg>
      );
  }
}

export function StatusIcon({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full ${statusMeta[status].icon}`}
    >
      <Glyph status={status} />
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
      <StatusIcon status={status} />
      {statusMeta[status].label}
    </span>
  );
}

export function StatusCell({ cell }: { cell?: Cell }) {
  const { status, note } = toStatus(cell);
  return (
    <div className="flex items-start gap-2.5">
      <StatusIcon status={status} />
      <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
        <span
          className={`text-sm font-medium ${status === "unknown" ? "text-zinc-400 dark:text-zinc-500" : ""}`}
        >
          {statusMeta[status].label}
        </span>
        {note && (
          <p className="text-[13px] leading-snug text-zinc-600 dark:text-zinc-400">{note}</p>
        )}
      </div>
    </div>
  );
}
