"use client";

import { useSyncExternalStore } from "react";
import { experienceMonthsAt, formatExperience } from "@/lib/experience";

function subscribe(onChange: () => void) {
  // Recheck at the next India calendar-month boundary, even if the tab stays open.
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    const now = new Date();
    const india = new Date(now.getTime() + 330 * 60_000);
    const nextMonth = Date.UTC(india.getUTCFullYear(), india.getUTCMonth() + 1, 1) - 330 * 60_000;
    timer = setTimeout(() => { onChange(); schedule(); }, Math.min(nextMonth - now.getTime() + 100, 2_147_483_647));
  };
  const refresh = () => onChange();
  schedule();
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("focus", refresh);
    document.removeEventListener("visibilitychange", refresh);
  };
}

const snapshot = () => experienceMonthsAt(new Date());
const serverSnapshot = () => null;

export default function ExperienceDuration() {
  // Keep the prerendered page stable, then use the visitor's current date.
  const months = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return <span title="Elapsed calendar months since February 2026, calculated in India time">{months === null ? "Since February 2026" : `${formatExperience(months)} of experience`}</span>;
}
