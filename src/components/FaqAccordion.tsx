"use client"

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
    <Accordion type="single" collapsible className="w-full max-w-[760px]">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-b border-slate-200">
          <AccordionTrigger className="text-left text-[1rem] font-semibold font-[Inter,sans-serif] text-slate-900 hover:text-blue-700 hover:no-underline py-5 [&>svg]:text-blue-600">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[15px] leading-relaxed text-slate-600 font-[Inter,sans-serif] pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
