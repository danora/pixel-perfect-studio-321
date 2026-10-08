import type { Partner } from "./data";

export type Filters = { country: string; city: string; type: string; project: string; budget: string };
export const EMPTY_FILTERS: Filters = { country: "", city: "", type: "", project: "", budget: "" };

export function filterPartners(list: Partner[], f: Filters): Partner[] {
  const city = f.city.trim().toLowerCase();
  return list
    .filter((p) =>
      (!f.country || p.country === f.country) &&
      (!city || p.city.toLowerCase().includes(city)) &&
      (!f.type || p.type === f.type) &&
      (!f.project || p.categories.includes(f.project)) &&
      (!f.budget || p.budget === f.budget),
    )
    .sort((a, b) => b.fit - a.fit);
}
