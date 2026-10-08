import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { BUDGETS, COUNTRIES, PARTNERS, PARTNER_TYPES, PROJECT_TYPES } from "@/lib/data";
import { EMPTY_FILTERS, filterPartners, type Filters } from "@/lib/filter";
import { Btn, DemoNote, Field, PartnerCard, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Discover — KRAABMOD Partner Hunter" },
      { name: "description", content: "Find the designers and companies behind the world's most beautiful spaces." },
      { property: "og:title", content: "Discover — KRAABMOD Partner Hunter" },
      { property: "og:description", content: "Find the designers and companies behind the world's most beautiful spaces." },
    ],
  }),
  component: Index,
});

function Index() {
  const [f, setF] = useState<Filters>(EMPTY_FILTERS);
  const [q, setQ] = useState<Filters>(EMPTY_FILTERS);
  const results = filterPartners(PARTNERS, q);
  const active = Object.values(q).some((v) => v.trim());
  const set = (k: keyof Filters) => (v: string) => setF({ ...f, [k]: v });
  const clear = () => { setF(EMPTY_FILTERS); setQ(EMPTY_FILTERS); };

  return (
    <>
      <section className="relative">
        <img src={hero} alt="Minimalist travertine villa interior" width={1920} height={1088} className="h-[70vh] min-h-[480px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-28 text-primary-foreground">
          <h1 className="font-display text-6xl leading-[0.9] tracking-wide md:text-8xl lg:text-9xl">KRAABMOD<br /><span className="italic font-light">Partner Hunter</span></h1>
          <p className="mt-6 max-w-md text-base opacity-90">Find the designers and companies behind the world's most beautiful spaces.</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-6">
        <form onSubmit={(e) => { e.preventDefault(); setQ(f); }} className="grid gap-6 border border-border bg-card p-6 shadow-[0_30px_60px_-40px_var(--foreground)] sm:grid-cols-2 lg:grid-cols-6 lg:items-end md:p-8">
          <Field label="Country"><Select value={f.country} onChange={set("country")} options={COUNTRIES} /></Field>
          <Field label="City"><input value={f.city} onChange={(e) => set("city")(e.target.value)} placeholder="Any city" className="field" /></Field>
          <Field label="Partner type"><Select value={f.type} onChange={set("type")} options={PARTNER_TYPES} /></Field>
          <Field label="Project type"><Select value={f.project} onChange={set("project")} options={PROJECT_TYPES} /></Field>
          <Field label="Project budget"><Select value={f.budget} onChange={set("budget")} options={BUDGETS} /></Field>
          <div className="flex flex-col gap-2">
            <Btn type="submit" className="py-4">Find partners</Btn>
            <Btn type="button" variant="ghost" onClick={clear} className="justify-center">Clear filters</Btn>
          </div>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="eyebrow">Results</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">{results.length} {results.length === 1 ? "matching partner" : active ? "matching partners" : "potential partners"}</h2>
          </div>
          <DemoNote />
        </div>
        {results.length ? (
          <div className="grid gap-8 md:grid-cols-2">{results.map((p) => <PartnerCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="border border-dashed border-border py-20 text-center">
            <p className="font-display text-3xl">No partners match these filters yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a broader city, another country or a different project type.</p>
            <Btn variant="outline" onClick={clear} className="mt-6">Clear filters</Btn>
          </div>
        )}
      </section>
    </>
  );
}
