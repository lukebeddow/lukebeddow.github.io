// Site-wide settings and small helpers.

/**
 * Review mode shows placeholders (content still to come) and marks drafted wording.
 * On in `npm run dev`; for a production-like review build use `PUBLIC_REVIEW=1 npm run build`.
 * A normal `npm run build` (what GitHub Actions deploys) hides placeholders and markers.
 */
export const REVIEW: boolean = import.meta.env.DEV || import.meta.env.PUBLIC_REVIEW === '1';

/** GoatCounter site code (cookie-free analytics), e.g. "lukebeddow". null = no analytics. */
export const GOATCOUNTER_CODE: string | null = null;

/** Hide placeholder entries outside review mode. */
export function shown<T extends { data: { placeholder: boolean } }>(entry: T): boolean {
  return REVIEW || !entry.data.placeholder;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ym = (d: string) => (d.length >= 7 ? `${MONTHS[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}` : d.slice(0, 4));

/** "2025-01".."2026-03" -> "Jan 2025 – Mar 2026"; "2026-03".."present" -> "Mar 2026 – now"; "2015".."2020" -> "2015 – 2020". */
export function dateSpan(start: string, end: string): string {
  return `${ym(start)} – ${end === 'present' ? 'now' : ym(end)}`;
}

/** "2020-10".."2024-10" -> "2020 – 24"; "2026-03".."present" -> "2026 – now". */
export function yearSpan(start: string, end: string): string {
  const a = start.slice(0, 4);
  if (end === 'present') return `${a} – now`;
  const b = end.slice(0, 4);
  if (a === b) return a;
  return a.slice(0, 2) === b.slice(0, 2) ? `${a} – ${b.slice(2)}` : `${a} – ${b}`;
}

/** "2026-11" -> "November 2026". */
export function monthYear(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y!, (m ?? 1) - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}
