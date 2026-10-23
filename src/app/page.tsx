import { ComparisonTable, slugify } from "@/components/ComparisonTable";
import { Footer } from "@/components/Footer";
import { Scorecards } from "@/components/Scorecards";
import { StatusBadge, statusOrder } from "@/components/StatusCell";
import { browsers, categories } from "@/data/comparison";
import { summarize } from "@/lib/summary";

export default function Home() {
  const summaries = summarize(browsers, categories);

  return (
    <main className="flex w-full flex-col gap-12 px-6 py-12 lg:px-10">
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">Arc alternatives</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Feature comparison of browsers I&apos;m testing as an Arc replacement.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {statusOrder.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </div>

        <Scorecards summaries={summaries} />

        {categories.length > 1 && (
          <nav className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category.name}
                href={`#${slugify(category.name)}`}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
              >
                {category.name}
              </a>
            ))}
          </nav>
        )}
      </header>

      {categories.map((category) => (
        <ComparisonTable key={category.name} category={category} browsers={browsers} />
      ))}

      <Footer />
    </main>
  );
}
