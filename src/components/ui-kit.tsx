import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Partner } from "@/lib/data";
import { usePartners } from "@/lib/store";

export function Btn({ variant = "solid", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" | "ghost" }) {
  return (
    <button
      {...p}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors disabled:opacity-50",
        variant === "solid" && "bg-primary text-primary-foreground hover:bg-primary/85",
        variant === "outline" && "border border-foreground/80 text-foreground hover:bg-primary hover:text-primary-foreground",
        variant === "ghost" && "text-muted-foreground hover:text-foreground px-0",
        className,
      )}
    />
  );
}

export function Header() {
  const link = "eyebrow hover:text-foreground transition-colors";
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold tracking-[0.25em]">KRAABMOD</span>
          <span className="eyebrow hidden sm:inline">Partner Hunter</span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8">
          <Link to="/" className={link} activeOptions={{ exact: true }} activeProps={{ className: "!text-foreground" }}>Discover</Link>
          <Link to="/partners" className={link} activeProps={{ className: "!text-foreground" }}>Partners</Link>
          <Link to="/projects" className={link} activeProps={{ className: "!text-foreground" }}>Projects</Link>
          <Btn variant="outline" className="hidden md:inline-flex px-4 py-2">+ Add partner</Btn>
        </nav>
      </div>
    </header>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  );
}

export function Select({ value, onChange, options, placeholder = "Any" }: { value: string; onChange: (v: string) => void; options: readonly string[]; placeholder?: string }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="field cursor-pointer">
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export function FitScore({ value, large }: { value: number; large?: boolean }) {
  return (
    <div className="text-right">
      <div className="eyebrow">Kraabmod fit</div>
      <div className={cn("font-display leading-none", large ? "text-6xl" : "text-4xl")}>
        {value.toFixed(1)}<span className="text-base text-muted-foreground"> / 10</span>
      </div>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="border border-border px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-muted-foreground">{children}</span>;
}

export function AddButton({ id, className }: { id: string; className?: string }) {
  const { saved, add } = usePartners();
  const isSaved = !!saved[id];
  return <Btn className={className} disabled={isSaved} onClick={() => add(id)}>{isSaved ? "✓ In partners" : "Add to partners"}</Btn>;
}

export function PartnerCard({ p }: { p: Partner }) {
  return (
    <article className="flex flex-col border border-border bg-card">
      <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow">{p.type}</div>
            <h3 className="mt-2 font-display text-3xl">{p.name}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{p.city}, {p.country}</div>
          </div>
          <FitScore value={p.fit} />
        </div>
        <p className="mt-4 text-sm leading-relaxed">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{p.categories.map((c) => <Tag key={c}>{c}</Tag>)}</div>
        <div className="mt-5 border-t border-border pt-4">
          <div className="eyebrow mb-2">Why it fits</div>
          <ul className="space-y-1 text-sm">{p.reasons.slice(0, 4).map((r) => <li key={r}>— {r}</li>)}</ul>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          <a href={`https://${p.website}`} target="_blank" rel="noreferrer" className="eyebrow hover:text-foreground">Website ↗</a>
          <a href={`https://instagram.com/${p.instagram.slice(1)}`} target="_blank" rel="noreferrer" className="eyebrow hover:text-foreground">Instagram ↗</a>
          <div className="ml-auto flex gap-2">
            <Link to="/partner/$id" params={{ id: p.id }} className="inline-flex items-center border border-foreground/80 px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] hover:bg-primary hover:text-primary-foreground">View profile</Link>
            <AddButton id={p.id} className="px-4" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function DemoNote() {
  return <span className="eyebrow border border-dashed border-border px-3 py-1">Demo data</span>;
}
