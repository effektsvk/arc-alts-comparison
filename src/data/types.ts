export type Status = "yes" | "no" | "partial" | "unknown";

/** A cell value: either a bare status, or a status with a short note. */
export type Cell = Status | { status: Status; note: string };

export type Browser = {
  id: string;
  name: string;
  /** Homepage. */
  url?: string;
  github?: string;
};

export type Feature<Id extends string = string> = {
  name: string;
  description?: string;
  /** Browsers missing from this map render as "unknown". */
  values: Partial<Record<Id, Cell>>;
};

export type Category<Id extends string = string> = {
  name: string;
  description?: string;
  features: Feature<Id>[];
};
