import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PARTNERS, STATUSES, type Status } from "@/lib/data";
import { usePartners } from "@/lib/store";
import { DemoNote, FitScore, PageTitle, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — KRAABMOD Partner Hunter" },
      { name: "description", content: "Saved KRAABMOD partners and their outreach status." },
      { property: "og:title", content: "Partners — KRAABMOD Partner Hunter" },
      { property: "og:description", content: "Saved KRAABMOD partners and their outreach status." },
    ],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  const { saved, setStatus, remove } = usePartners();
  const [search, setSearch] = useState("");
  const [status, setFilter] = useState("");
  const list = PARTNERS.filter((p) => saved[p.id])
    .filter((p) => !status || saved[p.id] === status)
    .filter((p) => `${p.name} ${p.city} ${p.country} ${p.type}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <PageTitle eyebrow="Saved" title="Partners"><DemoNote /></PageTitle>
      <div className="mb-8 grid gap-6 sm:grid-cols-[2fr_1fr]">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, city, type…" className="field" />
        <Select value={status} onChange={setFilter} options={STATUSES} placeholder="All statuses" />
      </div>
      {list.length === 0 ? (
        <p className="py-20 text-center font-display text-2xl text-muted-foreground">No saved partners yet. <Link to="/" className="underline">Discover</Link></p>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {list.map((p) => (
            <div key={p.id} className="grid items-center gap-4 py-6 md:grid-cols-[80px_2fr_1fr_160px_auto_auto]">
              <img src={p.image} alt="" loading="lazy" width={80} height={60} className="hidden h-16 w-20 object-cover md:block" />
              <div>
                <Link to="/partner/$id" params={{ id: p.id }} className="font-display text-2xl hover:underline">{p.name}</Link>
                <div className="text-sm text-muted-foreground">{p.city}, {p.country}</div>
              </div>
              <div className="eyebrow">{p.type}</div>
              <select value={saved[p.id]} onChange={(e) => setStatus(p.id, e.target.value as Status)} className="field cursor-pointer">
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <FitScore value={p.fit} />
              <button onClick={() => remove(p.id)} className="eyebrow hover:text-destructive">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
