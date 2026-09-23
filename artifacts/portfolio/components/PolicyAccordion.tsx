import { ChevronDown } from 'lucide-react';

interface PolicyAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// Native <details>: the policy text is always in the HTML (readable by
// crawlers and without JavaScript) and opens and closes with no script.
export function PolicyAccordion({ title, children, defaultOpen = false }: PolicyAccordionProps) {
  return (
    <details
      open={defaultOpen}
      className="disclosure group border border-border/40 bg-card rounded-xl overflow-hidden mb-4 transition-colors hover:border-primary/30"
    >
      <summary className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer">
        <span className="font-semibold text-lg text-foreground pr-4">{title}</span>
        <ChevronDown size={20} className="text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-5 md:px-6 pb-6 text-muted-foreground leading-relaxed text-sm space-y-4">
        {children}
      </div>
    </details>
  );
}
