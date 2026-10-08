import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getPartner, STATUSES, type Status } from "@/lib/data";
import { usePartners } from "@/lib/store";
import { OutreachDialog } from "@/components/OutreachDialog";
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
  const [outreachOpen, setOutreachOpen] = useState(false);
  const { saved, setStatus } = usePartners();
  const status = saved[p.id] ?? "Not in partners";
  const ext = (href: string, label: string) => <a className="underline" href={`https://${href}`} target="_blank" rel="noreferrer">{label}</a>;
  const row = (k: string, v: React.ReactNode) => (
    <div className="flex justify-between gap-4 border-b border-border py-3 text-sm"><span className="eyebrow">{k}</span><span className="text-right">{v}</span></div>
  );
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link to="/" className="eyebrow hover:text-foreground">← Back to Discover</Link>
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
            <h2 className="eyebrow mb-4">Why this partner fits KRAABMOD</h2>
            <ul className="grid gap-3 sm:grid-cols-2">{p.reasons.map((r, i) => (
              <li key={r} className="border border-border p-5"><span className="font-display text-3xl text-accent">0{i + 1}</span><div className="mt-2 text-sm">{r}</div></li>
            ))}</ul>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Project types</h2>
            <div className="flex flex-wrap gap-2">{p.categories.map((c) => <Tag key={c}>{c}</Tag>)}</div>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Example projects</h2>
            <div className="divide-y divide-border border-y border-border">{p.exampleProjects.map((x) => (
              <div key={x.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span className="font-display text-2xl">{x.name}</span>
                <span className="text-sm text-muted-foreground">{x.location} · {x.type} · {x.year}</span>
              </div>
            ))}</div>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Notes</h2>
            <textarea defaultValue={p.notes} placeholder="Add internal notes…" rows={4} className="w-full border border-border bg-card p-4 text-sm outline-none focus:border-foreground" />
          </section>
        </div>
        <aside className="h-fit border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-2xl">Contact</h2><DemoNote /></div>
          {row("Contact person", <span>{p.contactPerson.name}<br /><span className="text-muted-foreground">{p.contactPerson.role}</span></span>)}
          {row("Contact status", <span className="border border-border px-2 py-1 text-[0.68rem] uppercase tracking-wider">{status}</span>)}
          {row("Status", (
            <select
              value={saved[p.id] ?? "New"}
              onChange={(e) => setStatus(p.id, e.target.value as Status)}
              aria-label="Partner status"
              className="field cursor-pointer"
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          ))}
          {row("Website", ext(p.website, p.website))}
          {row("Instagram", ext(`instagram.com/${p.instagram.slice(1)}`, p.instagram))}
          {row("LinkedIn", ext(p.linkedin, "Company page"))}
          {row("Email", p.email)}
          {row("Phone", p.phone)}
          {row("Type", p.type)}
          {row("Est. project budget", p.budget)}
          <div className="mt-6 grid gap-3">
            <AddButton id={p.id} />
            <Btn variant="outline" onClick={() => setOutreachOpen(true)}>Generate outreach message</Btn>
            {saved[p.id] && <Link to="/partners" className="eyebrow text-center hover:text-foreground">View in Partners →</Link>}
          </div>
        </aside>
      </div>
      <OutreachDialog partner={p} open={outreachOpen} onOpenChange={setOutreachOpen} />
    </div>
  );
}
