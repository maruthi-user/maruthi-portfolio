// Only the joining month is known, so measure elapsed calendar months in India.
// This is a joining date, not a duration that needs monthly editing.
export const experienceStart = { year: 2026, month: 2 };
export const experiencePeriod = "Feb 2026 – Present";

export function experienceMonthsAt(date: Date): number {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "numeric",
  }).formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  return Math.max(0, (year - experienceStart.year) * 12 + month - experienceStart.month);
}

export function formatExperience(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const yearLabel = `${years} ${years === 1 ? "year" : "years"}`;
  const monthLabel = `${remainder} ${remainder === 1 ? "month" : "months"}`;
  return years ? (remainder ? `${yearLabel} ${monthLabel}` : yearLabel) : monthLabel;
}
