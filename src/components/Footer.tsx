import { GitHubIcon, XIcon } from "./icons";

const linkClass =
  "inline-flex items-center gap-1.5 text-zinc-700 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:text-zinc-300 dark:hover:text-white";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>Made by Erik Slovák</span>
        <ExternalLink href="https://github.com/effektsvk">
          <GitHubIcon />
          effektsvk
        </ExternalLink>
        <ExternalLink href="https://x.com/effektsvk">
          <XIcon />
          effektsvk
        </ExternalLink>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <ExternalLink href="https://github.com/effektsvk/arc-alts-comparison">Source on GitHub</ExternalLink>
        <span>
          Built with <ExternalLink href="https://t3.codes">T3 Code</ExternalLink>
        </span>
      </div>
    </footer>
  );
}
