import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { faqs } from "@/lib/mock-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
          <HelpCircle className="size-6" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">
          Everything you need to know about using ScholarNaija.
        </p>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} value={`item-${i}`}>
            <AccordionTrigger className="font-display text-left text-base font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div id="privacy" className="mt-14 scroll-mt-24 rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Privacy Policy</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ScholarNaija respects your privacy. Any profile information you enter is stored locally in your
          browser for this preview build — no account data is transmitted to a server. When a backend is
          introduced, this section will be replaced with our full privacy policy.
        </p>
      </div>

      <div id="terms" className="mt-6 scroll-mt-24 rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Terms of Service</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ScholarNaija is a discovery platform, not a scholarship provider. We do not guarantee admission
          or funding outcomes. Always verify details on the official provider's website before applying.
        </p>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Still have questions?{" "}
        <Link to="/about#contact" className="text-primary hover:underline">
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}
