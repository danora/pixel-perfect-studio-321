import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export const COUNTRIES = ["Italy", "France", "Spain", "Switzerland", "Germany", "Estonia", "UK", "Monaco", "Norway"];
export const PARTNER_TYPES = ["Interior Designer", "Architect", "Developer", "Contractor", "Design Studio"];
export const PROJECT_TYPES = ["Luxury Residential", "Villa", "Penthouse", "Hotel", "Restaurant", "Commercial", "Yacht"];
export const BUDGETS = ["€250k – €1M", "€1M – €5M", "€5M – €20M", "€20M+"];
export const STATUSES = ["New", "Contacted", "Replied", "Meeting", "Project", "Won", "Not relevant"] as const;
export type Status = (typeof STATUSES)[number];

export type Partner = {
  id: string;
  name: string;
  city: string;
  country: string;
  type: string;
  description: string;
  categories: string[];
  fit: number;
  reasons: string[];
  website: string;
  instagram: string;
  email: string;
  phone: string;
  notes: string;
  image: string;
  budget: string;
  linkedin: string;
  contactPerson: { name: string; role: string };
  exampleProjects: { name: string; location: string; year: string; type: string }[];
};

const BASE: Omit<Partner, "linkedin" | "contactPerson" | "exampleProjects">[] = [
  { id: "studio-forma", name: "Studio Forma", city: "Milan", country: "Italy", type: "Interior Designer", description: "Quiet, material-led interiors for private residences across Lake Como and the Riviera.", categories: ["Luxury Residential", "Villa", "Penthouse"], fit: 9.4, reasons: ["Luxury residential projects", "Minimalist architecture", "Integrated lighting", "High-end villas and apartments"], website: "studioforma.example", instagram: "@studioforma", email: "info@studioforma.example", phone: "+39 02 0000 0000", notes: "Strong focus on bespoke joinery; likely open to wall-system integration.", image: p1, budget: "€1M – €5M" },
  { id: "noir-atelier", name: "Noir Atelier", city: "Paris", country: "France", type: "Design Studio", description: "Hospitality and boutique hotel interiors with a dark, sculptural signature.", categories: ["Hotel", "Restaurant", "Commercial"], fit: 8.9, reasons: ["Boutique hotel pipeline", "Signature lighting details", "Repeat-room scale"], website: "noiratelier.example", instagram: "@noir.atelier", email: "studio@noiratelier.example", phone: "+33 1 00 00 00 00", notes: "Two hotel openings planned for 2027.", image: p2, budget: "€5M – €20M" },
  { id: "casa-blanca", name: "Casa Blanca Arquitectura", city: "Marbella", country: "Spain", type: "Architect", description: "Mediterranean villas in lime plaster and stone, designed end-to-end from plot to furniture.", categories: ["Villa", "Luxury Residential"], fit: 8.6, reasons: ["Villa specialists", "Full turnkey delivery", "International clientele"], website: "casablanca-arq.example", instagram: "@casablanca.arq", email: "hola@casablanca-arq.example", phone: "+34 952 000 000", notes: "", image: p3, budget: "€5M – €20M" },
  { id: "nordlys", name: "Nordlys Development", city: "Oslo", country: "Norway", type: "Developer", description: "Premium waterfront apartment developments with high spec standards.", categories: ["Penthouse", "Luxury Residential", "Commercial"], fit: 7.8, reasons: ["Multi-unit volume", "Spec-level interiors", "Waterfront penthouses"], website: "nordlys.example", instagram: "@nordlys.dev", email: "contact@nordlys.example", phone: "+47 22 00 00 00", notes: "", image: p1, budget: "€20M+" },
  { id: "meridian", name: "Meridian Yacht Interiors", city: "Monaco", country: "Monaco", type: "Interior Designer", description: "Superyacht interiors where weight, precision and finish are non-negotiable.", categories: ["Yacht", "Luxury Residential"], fit: 8.2, reasons: ["Precision-engineered panels", "Ultra-high-net-worth clients", "Lightweight systems needed"], website: "meridian-yi.example", instagram: "@meridian.yacht", email: "office@meridian-yi.example", phone: "+377 00 00 00 00", notes: "", image: p2, budget: "€5M – €20M" },
  { id: "baltic-build", name: "Baltic Build Group", city: "Tallinn", country: "Estonia", type: "Contractor", description: "Fit-out contractor for luxury residential and commercial projects in the Baltics.", categories: ["Commercial", "Luxury Residential"], fit: 7.1, reasons: ["Local installation partner", "Fit-out capacity"], website: "balticbuild.example", instagram: "@balticbuild", email: "info@balticbuild.example", phone: "+372 600 0000", notes: "", image: p3, budget: "€1M – €5M" },
];

const EXTRAS: Record<string, Pick<Partner, "linkedin" | "contactPerson" | "exampleProjects">> = {
  "studio-forma": { linkedin: "linkedin.com/company/studio-forma", contactPerson: { name: "Giulia Ferrari", role: "Founder & Creative Director" }, exampleProjects: [{ name: "Villa Bellagio", location: "Lake Como", year: "2025", type: "Villa" }, { name: "Brera Penthouse", location: "Milan", year: "2024", type: "Penthouse" }, { name: "Casa Portofino", location: "Liguria", year: "2023", type: "Luxury Residential" }] },
  "noir-atelier": { linkedin: "linkedin.com/company/noir-atelier", contactPerson: { name: "Camille Laurent", role: "Partner, Hospitality" }, exampleProjects: [{ name: "Hôtel Obscura", location: "Paris", year: "2025", type: "Hotel" }, { name: "Maison Ombre", location: "Lyon", year: "2024", type: "Restaurant" }] },
  "casa-blanca": { linkedin: "linkedin.com/company/casa-blanca-arq", contactPerson: { name: "Javier Ruiz", role: "Principal Architect" }, exampleProjects: [{ name: "Villa Sierra Blanca", location: "Marbella", year: "2025", type: "Villa" }, { name: "Casa Benahavís", location: "Málaga", year: "2023", type: "Villa" }] },
  nordlys: { linkedin: "linkedin.com/company/nordlys-development", contactPerson: { name: "Erik Halvorsen", role: "Head of Product" }, exampleProjects: [{ name: "Bjørvika Penthouses", location: "Oslo", year: "2026", type: "Penthouse" }, { name: "Tjuvholmen Residences", location: "Oslo", year: "2024", type: "Luxury Residential" }] },
  meridian: { linkedin: "linkedin.com/company/meridian-yacht-interiors", contactPerson: { name: "Luca Moreau", role: "Design Director" }, exampleProjects: [{ name: "M/Y Aurelia (62m)", location: "Monaco", year: "2025", type: "Yacht" }, { name: "M/Y Solenne (48m)", location: "Viareggio", year: "2023", type: "Yacht" }] },
  "baltic-build": { linkedin: "linkedin.com/company/baltic-build-group", contactPerson: { name: "Mart Tamm", role: "Project Director" }, exampleProjects: [{ name: "Noblessner Lofts", location: "Tallinn", year: "2025", type: "Luxury Residential" }, { name: "Rotermann Offices", location: "Tallinn", year: "2024", type: "Commercial" }] },
};

export const PARTNERS: Partner[] = BASE.map((b) => ({ ...b, ...EXTRAS[b.id] }));

export function outreachMessage(p: Partner): string {
  const first = p.contactPerson.name.split(" ")[0];
  const proj = p.exampleProjects[0];
  const cats = p.categories.slice(0, 2).map((c) => c.toLowerCase()).join(" and ");
  return `Subject: ${proj ? proj.name : p.name} — integrated interior systems by KRAABMOD

Dear ${first},

I've been following ${p.name}'s work in ${p.city} with real admiration${proj ? ` — ${proj.name} in ${proj.location} in particular` : ""}. The restraint and precision in your ${cats} projects is exactly the kind of architecture KRAABMOD is built for.

KRAABMOD designs premium interior wall systems with integrated lighting, concealed storage and seamless panel joints, made to measure for projects where every detail is visible. ${p.reasons[0] ? `Given your focus on ${p.reasons[0].toLowerCase()}, ` : ""}I believe our systems could save your team coordination time while raising the finish level your clients expect.

Would you be open to a 20-minute call in the coming weeks? I'd be glad to share material samples and a few recent references relevant to ${p.categories[0]?.toLowerCase() ?? "your"} projects.

Warm regards,
KRAABMOD Partnerships
partners@kraabmod.example`;
}

export const getPartner = (id: string) => PARTNERS.find((p) => p.id === id);

export type Project = {
  id: string; name: string; location: string; type: string; value: string;
  designer: string; developer: string; status: string; notes: string;
};

export const PROJECTS: Project[] = [
  { id: "1", name: "Villa Serena", location: "Lake Como, Italy", type: "Villa", value: "€420,000", designer: "Studio Forma", developer: "Private client", status: "Proposal", notes: "Full wall systems, 3 floors." },
  { id: "2", name: "Hôtel Lumen", location: "Paris, France", type: "Hotel", value: "€1,150,000", designer: "Noir Atelier", developer: "Lumen Hospitality", status: "Lead", notes: "62 rooms, opening 2027." },
  { id: "3", name: "Bjørvika Penthouses", location: "Oslo, Norway", type: "Penthouse", value: "€780,000", designer: "—", developer: "Nordlys Development", status: "Meeting", notes: "6 penthouse units." },
  { id: "4", name: "M/Y Aurelia", location: "Monaco", type: "Yacht", value: "€310,000", designer: "Meridian Yacht Interiors", developer: "—", status: "Won", notes: "Lightweight panels." },
];
