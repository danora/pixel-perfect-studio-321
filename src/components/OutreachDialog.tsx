import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { outreachMessage, type Partner } from "@/lib/data";
import { Btn } from "@/components/ui-kit";

export function OutreachDialog({ partner, open, onOpenChange }: { partner: Partner; open: boolean; onOpenChange: (o: boolean) => void }) {
  const [text, setText] = useState(() => outreachMessage(partner));
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-none border-border bg-card p-8">
        <DialogHeader>
          <div className="eyebrow">Outreach · Example draft</div>
          <DialogTitle className="font-display text-4xl font-normal">Message to {partner.contactPerson.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{partner.contactPerson.role}, {partner.name} · {partner.email}</DialogDescription>
        </DialogHeader>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={16} className="mt-2 w-full border border-border bg-background p-4 text-sm leading-relaxed outline-none focus:border-foreground" />
        <div className="flex flex-wrap justify-end gap-3">
          <Btn variant="ghost" onClick={() => setText(outreachMessage(partner))} className="mr-auto">Reset</Btn>
          <Btn variant="outline" onClick={copy}>{copied ? "Copied" : "Copy message"}</Btn>
          <a href={`mailto:${partner.email}?body=${encodeURIComponent(text)}`} className="inline-flex items-center bg-primary px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/85">Open in email</a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
