import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getPartner } from "@/lib/data";
import { AddButton, Btn, DemoNote, FitScore, Tag } from "@/components/ui-kit";

export const Route = createFileRoute("/partner/$id")({
  loader: ({ params }) => {
    const partner = getPartner(params.id);
    if (!partner) throw notFound();
    return { partner };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Partner not found" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.partner.name} — KRAABMOD Partner Hunter`;
    return { meta: [{ title: t }, { name: "description", content: loaderData.partner.description }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.partner.description }] };
  },
  notFoundComponent: () => <div className="p-20 text-center font-display text-3xl">Partner not found. <Link to="/" className="underline">Back</Link></div>,
  component: Profile,
});

function Profile() {
  const { partner: p } = Route.useLoaderData();
  const [msg, setMsg] = useState("");
  const outreach = () => setMsg(`Dear ${p.name} team,\n\nWe've been following your work in ${p.city} — particularly your ${p.categories[0].toLowerCase()} projects. KRAABMOD develops premium interior wall and lighting systems that integrate seamlessly into architecture like yours.\n\nWould you be open to a short conversation about upcoming projects?\n\nWarm regards,\nKRAABMOD`);
  const row = (k: string, v: React.ReactNode) => (
    <div className="flex justify-between gap-4 border-b border-border py-3 text-sm"><span className="eyebrow">{k}</span><span className="text-right">{v}</span></div>
  );
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link to="/" className="eyebrow hover:text-foreground">← Back to discover</Link>
      <img src={p.image} alt={p.name} width={1024} height={768} className="mt-6 aspect-[21/8] w-full object-cover" />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="eyebrow">{p.type}</div>
          <h1 className="mt-3 font-display text-6xl md:text-7xl">{p.name}</h1>
          <div className="mt-2 text-muted-foreground">{p.city}, {p.country}</div>
        </div>
        <FitScore value={p.fit} large />
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <p className="font-display text-2xl leading-snug">{p.description}</p>
          <section>
            <h2 className="eyebrow mb-4">Why KRAABMOD?</h2>
            <ul className="grid gap-3 sm:grid-cols-2">{p.reasons.map((r, i) => (
              <li key={r} className="border border-border p-5"><span className="font-display text-3xl text-accent">0{i + 1}</span><div className="mt-2 text-sm">{r}</div></li>
            ))}</ul>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Project types</h2>
            <div className="flex flex-wrap gap-2">{p.categories.map((c) => <Tag key={c}>{c}</Tag>)}</div>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Notes</h2>
            <textarea defaultValue={p.notes} placeholder="Add internal notes…" rows={4} className="w-full border border-border bg-card p-4 text-sm outline-none focus:border-foreground" />
          </section>
          {msg && (
            <section>
              <h2 className="eyebrow mb-4">Outreach draft</h2>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={10} className="w-full border border-border bg-card p-4 text-sm outline-none" />
            </section>
          )}
        </div>
        <aside className="h-fit border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-2xl">Contact</h2><DemoNote /></div>
          {row("Website", <a className="underline" href={`https://${p.website}`} target="_blank" rel="noreferrer">{p.website}</a>)}
          {row("Instagram", <a className="underline" href={`https://instagram.com/${p.instagram.slice(1)}`} target="_blank" rel="noreferrer">{p.instagram}</a>)}
          {row("Email", p.email)}
          {row("Phone", p.phone)}
          {row("Type", p.type)}
          {row("Typical budget", p.budget)}
          <div className="mt-6 grid gap-3">
            <AddButton id={p.id} />
            <Btn variant="outline" onClick={outreach}>Generate outreach message</Btn>
          </div>
        </aside>
      </div>
    </div>
  );
}
