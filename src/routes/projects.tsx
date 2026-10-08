import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PROJECTS, PROJECT_TYPES, type Project } from "@/lib/data";
import { Btn, DemoNote, Field, PageTitle, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — KRAABMOD Partner Hunter" },
      { name: "description", content: "Track potential KRAABMOD projects, values and partners." },
      { property: "og:title", content: "Projects — KRAABMOD Partner Hunter" },
      { property: "og:description", content: "Track potential KRAABMOD projects, values and partners." },
    ],
  }),
  component: ProjectsPage,
});

const STAGES = ["Lead", "Meeting", "Proposal", "Won", "Lost"];
const blank: Project = { id: "", name: "", location: "", type: "", value: "", designer: "", developer: "", status: "Lead", notes: "" };

function ProjectsPage() {
  const [projects, setProjects] = useState(PROJECTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [search, setSearch] = useState("");
  const up = (k: keyof Project) => (v: string) => setForm({ ...form, [k]: v });
  const list = projects.filter((p) => JSON.stringify(p).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <PageTitle eyebrow="Pipeline" title="Projects">
        <div className="flex items-center gap-4"><DemoNote /><Btn onClick={() => setOpen(!open)}>{open ? "Close" : "+ New project"}</Btn></div>
      </PageTitle>

      {open && (
        <form
          onSubmit={(e) => { e.preventDefault(); if (!form.name) return; setProjects([{ ...form, id: crypto.randomUUID() }, ...projects]); setForm(blank); setOpen(false); }}
          className="mb-10 grid gap-6 border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {(["name", "location", "value", "designer", "developer"] as const).map((k) => (
            <Field key={k} label={k === "value" ? "Estimated value" : k}><input value={form[k]} onChange={(e) => up(k)(e.target.value)} className="field" /></Field>
          ))}
          <Field label="Project type"><Select value={form.type} onChange={up("type")} options={PROJECT_TYPES} placeholder="Select" /></Field>
          <Field label="Status"><Select value={form.status} onChange={up("status")} options={STAGES} placeholder="Select" /></Field>
          <Field label="Notes"><input value={form.notes} onChange={(e) => up("notes")(e.target.value)} className="field" /></Field>
          <Btn type="submit" className="sm:col-span-2 lg:col-span-4">Save project</Btn>
        </form>
      )}

      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects…" className="field mb-8" />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead><tr className="border-b border-foreground/70">
            {["Project", "Location", "Type", "Est. value", "Designer", "Developer", "Status", "Notes"].map((h) => <th key={h} className="eyebrow py-3 pr-4 font-normal">{h}</th>)}
          </tr></thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-border">
                <td className="py-5 pr-4 font-display text-xl">{p.name}</td>
                <td className="pr-4">{p.location}</td>
                <td className="pr-4">{p.type}</td>
                <td className="pr-4 font-display text-lg">{p.value}</td>
                <td className="pr-4">{p.designer}</td>
                <td className="pr-4">{p.developer}</td>
                <td className="pr-4"><span className="border border-border px-2 py-1 text-[0.68rem] uppercase tracking-wider">{p.status}</span></td>
                <td className="text-muted-foreground">{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
