import type { Browser } from "@/data/types";
import { GitHubIcon, GlobeIcon } from "./icons";

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="rounded p-0.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
    >
      {children}
    </a>
  );
}

export function BrowserName({ browser }: { browser: Browser }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{browser.name}</span>
      {(browser.url || browser.github) && (
        <span className="inline-flex items-center gap-0.5 font-normal">
          {browser.url && (
            <IconLink href={browser.url} label={`${browser.name} homepage`}>
              <GlobeIcon />
            </IconLink>
          )}
          {browser.github && (
            <IconLink href={browser.github} label={`${browser.name} on GitHub`}>
              <GitHubIcon />
            </IconLink>
          )}
        </span>
      )}
    </span>
  );
}
