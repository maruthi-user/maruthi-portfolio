export const portfolioDesigns = [
  { value: "midnight", label: "Midnight & Ice" },
  { value: "indigo", label: "Studio Indigo" },
] as const;

export type PortfolioDesign = typeof portfolioDesigns[number]["value"];

export function getPortfolioDesign(): PortfolioDesign {
  return document.documentElement.dataset.design === "indigo" ? "indigo" : "midnight";
}

export function getServerDesign(): PortfolioDesign {
  return "midnight";
}

export function subscribePortfolioDesign(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== "portfolio-design" && event.key !== null) return;
    document.documentElement.dataset.design = event.newValue === "indigo" ? "indigo" : "midnight";
    callback();
  };

  window.addEventListener("portfolio-design", callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("portfolio-design", callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function setPortfolioDesign(design: PortfolioDesign) {
  document.documentElement.dataset.design = design;
  try {
    localStorage.setItem("portfolio-design", design);
  } catch {
    // The selected design still applies when browser storage is unavailable.
  }
  window.dispatchEvent(new Event("portfolio-design"));
}
