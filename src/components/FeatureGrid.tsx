import Link from "next/link";
import { BookOpen, BrainCircuit, ClipboardCheck, MonitorCheck, WalletCards } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Guided build path",
    href: "/guide",
    copy: "The sequence follows the real order of a beginner-friendly desktop build, from buying parts to OS install."
  },
  {
    icon: MonitorCheck,
    title: "Compatibility checker",
    href: "/compatibility",
    copy: "Socket and RAM filters surface motherboard matches and warn when a selection does not line up."
  },
  {
    icon: WalletCards,
    title: "Budget builder",
    href: "/budgets",
    copy: "Three PLN build tiers make tradeoffs visible for starter, balanced, and creator setups."
  },
  {
    icon: ClipboardCheck,
    title: "Persistent checklist",
    href: "/guide",
    copy: "Completed guide steps are stored locally in the browser so progress survives refreshes."
  },
  {
    icon: BrainCircuit,
    title: "Knowledge quiz",
    href: "/quiz",
    copy: "Short multiple-choice questions reinforce the decisions that matter during a real PC build."
  }
];

export function FeatureGrid() {
  return (
    <section className="border-b border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-plasma/45 hover:bg-white/8"
            >
              <feature.icon className="size-6 text-mint" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{feature.copy}</p>
              <Link href={feature.href} className="mt-4 inline-flex min-h-11 items-center text-mint underline">Open {feature.title.toLowerCase()} →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
