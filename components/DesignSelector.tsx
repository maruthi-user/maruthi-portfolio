"use client";

import { useSyncExternalStore } from "react";
import {
  getPortfolioDesign,
  getServerDesign,
  portfolioDesigns,
  setPortfolioDesign,
  subscribePortfolioDesign,
} from "@/lib/design";

export default function DesignSelector() {
  const design = useSyncExternalStore(
    subscribePortfolioDesign,
    getPortfolioDesign,
    getServerDesign,
  );

  return (
    <label className="design-selector">
      <span className="sr-only">Portfolio design</span>
      <select
        value={design}
        onChange={(event) => setPortfolioDesign(event.target.value === "indigo" ? "indigo" : "midnight")}
      >
        {portfolioDesigns.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="m4 6 4 4 4-4" />
      </svg>
    </label>
  );
}
