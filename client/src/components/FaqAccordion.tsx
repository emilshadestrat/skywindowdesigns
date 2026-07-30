import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="mt-10">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-b border-[var(--border-subtle)]">
          <AccordionTrigger className="text-left text-lg font-semibold font-[var(--font-display)] text-[var(--text-heading)] py-5">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[15.5px] leading-relaxed text-[var(--text-body)] max-w-[640px] pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
