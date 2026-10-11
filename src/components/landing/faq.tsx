import { Card } from "@/components/ui/card";

const faqItems = [
  {
    question: "Is the service available yet?",
    answer:
      "We're currently validating demand and determining the first version of the product. Joining the wishlist does not mean the service is already available.",
  },
  {
    question: "Who is this for?",
    answer:
      "Developers, AI startups, researchers, students, universities, and teams that need GPU compute for AI workloads.",
  },
  {
    question: "What can I run?",
    answer:
      "We're investigating use cases including inference, fine-tuning, training, and generative AI. The workloads supported at launch will depend on demand and infrastructure.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing has not been finalized. We're studying workload requirements and upstream compute costs before setting sustainable prices.",
  },
  {
    question: "Can I pay in Ethiopian birr?",
    answer:
      "Local payment is one of the main possibilities we're investigating. Available payment methods will be confirmed if the service launches.",
  },
  {
    question: "Will I get free access?",
    answer:
      "We're exploring trial access for selected early users, but it has not been finalized.",
  },
  {
    question: "Do I need to know how to configure GPUs?",
    answer:
      "That is one of the questions we're researching. We're investigating how much users want direct compute access versus ready-to-run AI environments.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">FAQ</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Common questions, answered plainly.</h2>
      </div>

      <div className="mt-8 grid gap-3">
        {faqItems.map((item) => (
          <Card key={item.question} className="overflow-hidden">
            <details className="group px-6 py-5">
              <summary className="cursor-pointer list-none text-base font-semibold outline-none">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-[color:var(--primary)] transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--secondary)]">{item.answer}</p>
            </details>
          </Card>
        ))}
      </div>
    </section>
  );
}