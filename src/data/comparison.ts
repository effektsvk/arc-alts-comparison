import type { Browser, Category } from "./types";

/**
 * Edit this file to update the comparison — the page renders whatever is here.
 *
 * - Add a browser: append to `browsers`. It becomes a new column everywhere.
 * - Add a table: append to `categories`. Each category renders as its own table.
 * - Add a row: append to a category's `features`.
 *
 * Cell values are "yes" | "no" | "partial" | "unknown", or an object with a note:
 *
 *   {
 *     name: "Vertical tabs",
 *     description: "Tabs live in a sidebar instead of a top strip",
 *     values: {
 *       zen: "yes",
 *       ardia: { status: "partial", note: "Only via extension" },
 *       // crest omitted → shown as "unknown"
 *     },
 *   },
 */

export const browsers = [
  {
    id: "zen",
    name: "Zen",
    url: "https://zen-browser.app",
    github: "https://github.com/zen-browser/desktop",
  },
  {
    id: "ardia",
    name: "Ardia",
    url: "https://ardia.dev",
    github: "https://github.com/mantrakp04/ardia",
  },
  {
    id: "crest",
    name: "Crest",
    url: "https://crestbrowser.com",
    github: "https://github.com/pauljoda/Crest",
  },
  {
    id: "phi",
    name: "Phi",
    url: "https://phibrowser.com",
    github: "https://github.com/phibrowser/phibrowser-mac",
  },
  {
    id: "stedding",
    name: "Stedding",
    url: "https://stedding.dev",
    github: "https://github.com/ysalitrynskyi/stedding-browser",
  },
] as const satisfies readonly Browser[];

export type BrowserId = (typeof browsers)[number]["id"];

export const categories: Category<BrowserId>[] = [
  {
    name: "Spaces & Profiles",
    description: "Arc keeps Spaces and Profiles decoupled: several Spaces can share one Profile.",
    features: [
      {
        name: "Spaces",
        values: {
          zen: "yes",
          ardia: "yes",
          crest: "yes",
          phi: "yes",
          stedding: "yes",
        },
      },
      {
        name: "Profiles",
        description: "Isolated cookies, logins and site data",
        values: {
          zen: { status: "partial", note: "Via Containers, which act like Profiles" },
          ardia: "yes",
          crest: "yes",
          phi: "yes",
          stedding: { status: "partial", note: "A Space can get its own session (own cookies and site data); passwords and extensions stay shared" },
        },
      },
      {
        name: "Multiple Spaces per Profile",
        description: "Spaces and Profiles are decoupled, like in Arc",
        values: {
          zen: { status: "partial", note: "A Space can have a default Container, but its tabs aren't forced to use it" },
          ardia: { status: "no", note: "A Space is a Profile (1:1)" },
          crest: { status: "no", note: "A Space is a Profile (1:1)" },
          phi: "yes",
          stedding: "yes",
        },
      },
      {
        name: "Moving a tab to another Space switches its Profile",
        description: "The tab reopens under the target Space's Profile",
        values: {
          zen: { status: "no", note: "The tab keeps its old Container, so one Space can mix Containers" },
          ardia: "yes",
          crest: "yes",
          phi: "yes",
          stedding: { status: "yes", note: "The tab moves to the target Space's session and reloads" },
        },
      },
    ],
  },
  {
    name: "Tab Switching",
    features: [
      {
        name: "Recent tab switcher",
        description: "Ctrl+Tab shows a switcher with tabs in most-recently-used order",
        values: {
          zen: {
            status: "partial",
            note: "Either this or next/previous on Ctrl+Tab, via the \"Ctrl+Tab cycles through tabs in recently used order\" setting",
          },
          ardia: "yes",
          crest: { status: "partial", note: "Can jump to the most recent tab, but there's no switcher" },
          phi: "yes",
          stedding: { status: "yes", note: "Tap for the previous tab, hold for the five most recent" },
        },
      },
      {
        name: "Next / previous tab",
        description: "Shortcuts to move to the tab above or below in the sidebar",
        values: {
          zen: {
            status: "partial",
            note: "Either this or the recent tab switcher on Ctrl+Tab, via the same setting",
          },
          ardia: "yes",
          crest: "yes",
          phi: "yes",
          stedding: "yes",
        },
      },
    ],
  },
  {
    name: "Links",
    features: [
      {
        name: "Air Traffic Control",
        description: "Rules that route external links to a specific Space",
        values: {
          zen: { status: "yes", note: "Full parity with Arc, including \"Most Recent Space\"" },
          ardia: "no",
          crest: {
            status: "yes",
            note: "No \"Most Recent Space\" option; only matters when \"Open in\" is set to \"Chosen Space\"",
          },
          phi: { status: "yes", note: "No \"Most Recent Space\" option" },
          stedding: { status: "yes", note: "Per-site rules; a chosen Space for links from other apps is Mac-only for now" },
        },
      },
    ],
  },
  {
    name: "Look & Feel",
    features: [
      {
        name: "Show full URL",
        description: "Display the complete URL instead of just the domain",
        values: {
          zen: "yes",
          ardia: "yes",
          crest: "no",
          phi: "yes",
          stedding: { status: "yes", note: "On by default; the address bar menu switches to the bare host like Arc" },
        },
      },
      {
        name: "Hide bookmarks",
        values: {
          zen: "yes",
          ardia: "no",
          crest: "yes",
          phi: "no",
          stedding: "yes",
        },
      },
    ],
  },
  {
    name: "Importing",
    features: [
      {
        name: "Import from Arc",
        description: "Bookmarks and folders carried over from Arc",
        values: {
          ardia: { status: "partial", note: "Only root bookmarks; all folders were ignored" },
          crest: { status: "yes", note: "Imported everything" },
          phi: { status: "yes", note: "Imported everything via \"Migrate from Another Browser…\"" },
          stedding: { status: "yes", note: "Spaces, Favorites, pinned tabs, nested folders, history and passwords; macOS only for now" },
        },
      },
    ],
  },
];
