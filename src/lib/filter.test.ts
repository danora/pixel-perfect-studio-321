import { describe, expect, it } from "vitest";
import { PARTNERS } from "./data";
import { EMPTY_FILTERS, filterPartners } from "./filter";

describe("filterPartners", () => {
  it("returns all partners with no filters", () => {
    expect(filterPartners(PARTNERS, EMPTY_FILTERS)).toHaveLength(PARTNERS.length);
  });
  it("filters by country", () => {
    expect(filterPartners(PARTNERS, { ...EMPTY_FILTERS, country: "Italy" }).map((p) => p.id)).toEqual(["studio-forma"]);
  });
  it("matches city case-insensitively and ignores empty city", () => {
    expect(filterPartners(PARTNERS, { ...EMPTY_FILTERS, city: "  paris " })).toHaveLength(1);
    expect(filterPartners(PARTNERS, { ...EMPTY_FILTERS, city: "   " })).toHaveLength(PARTNERS.length);
  });
  it("filters by partner and project type", () => {
    expect(filterPartners(PARTNERS, { ...EMPTY_FILTERS, type: "Architect", project: "Villa" }).map((p) => p.id)).toEqual(["casa-blanca"]);
  });
  it("returns empty when nothing matches", () => {
    expect(filterPartners(PARTNERS, { ...EMPTY_FILTERS, country: "Germany" })).toEqual([]);
  });
});
