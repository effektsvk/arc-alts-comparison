import type { Browser, Category } from "@/data/types";
import { BrowserName } from "./BrowserName";
import { StatusCell, statusMeta, toStatus } from "./StatusCell";

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ComparisonTable({
  category,
  browsers,
}: {
  category: Category;
  browsers: readonly Browser[];
}) {
  return (
    <section id={slugify(category.name)} className="flex scroll-mt-6 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
          {category.name}
          <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">
            {category.features.length} {category.features.length === 1 ? "feature" : "features"}
          </span>
        </h2>
        {category.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{category.description}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[64rem] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[24%]" />
            {browsers.map((browser) => (
              <col key={browser.id} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="sticky left-0 z-10 bg-background max-xl:shadow-[inset_-1px_0_0_var(--color-zinc-200)] dark:max-xl:shadow-[inset_-1px_0_0_var(--color-zinc-800)] py-3 pr-5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Feature
              </th>
              {browsers.map((browser) => (
                <th key={browser.id} className="px-5 py-3 text-[15px] font-semibold">
                  <BrowserName browser={browser} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {category.features.length === 0 ? (
              <tr>
                <td
                  colSpan={browsers.length + 1}
                  className="px-5 py-10 text-center text-sm text-zinc-400 dark:text-zinc-500"
                >
                  No features yet — add some in <code className="font-mono">src/data/comparison.ts</code>
                </td>
              </tr>
            ) : (
              category.features.map((feature) => (
                <tr
                  key={feature.name}
                  className="border-b border-zinc-200 align-top dark:border-zinc-800"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-background max-xl:shadow-[inset_-1px_0_0_var(--color-zinc-200)] dark:max-xl:shadow-[inset_-1px_0_0_var(--color-zinc-800)] py-4 pr-5 font-normal"
                  >
                    <div className="text-[15px] font-medium leading-snug">{feature.name}</div>
                    {feature.description && (
                      <p className="mt-1 text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">
                        {feature.description}
                      </p>
                    )}
                  </th>
                  {browsers.map((browser) => {
                    const cell = feature.values[browser.id];
                    const tint = statusMeta[toStatus(cell).status].cellTint;
                    return (
                      <td key={browser.id} className={`px-5 py-4 ${tint}`}>
                        <StatusCell cell={cell} />
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
