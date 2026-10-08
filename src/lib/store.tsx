import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Status } from "./data";

type Saved = Record<string, Status>;
const Ctx = createContext<{ saved: Saved; add: (id: string) => void; setStatus: (id: string, s: Status) => void; remove: (id: string) => void } | null>(null);

const KEY = "kraabmod-saved";

export function PartnersProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>({ "studio-forma": "Contacted", "noir-atelier": "Meeting" });
  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setSaved(JSON.parse(raw));
  }, []);
  const update = (s: Saved) => { setSaved(s); localStorage.setItem(KEY, JSON.stringify(s)); };
  return (
    <Ctx.Provider value={{
      saved,
      add: (id) => !saved[id] && update({ ...saved, [id]: "New" }),
      setStatus: (id, st) => update({ ...saved, [id]: st }),
      remove: (id) => { const n = { ...saved }; delete n[id]; update(n); },
    }}>{children}</Ctx.Provider>
  );
}

export const usePartners = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("PartnersProvider missing");
  return c;
};
