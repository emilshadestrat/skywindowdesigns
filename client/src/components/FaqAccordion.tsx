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
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b border-slate-200/80 first:border-t"
        >
          <AccordionTrigger className="text-left text-[1.0625rem] font-semibold font-[Inter,sans-serif] text-slate-900 hover:text-blue-700 hover:no-underline py-6 transition-colors duration-200 [&>svg]:text-blue-600 [&>svg]:transition-transform [&>svg]:duration-300">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[15px] leading-[1.7] text-slate-600 font-[Inter,sans-serif] pb-6 pt-0">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
