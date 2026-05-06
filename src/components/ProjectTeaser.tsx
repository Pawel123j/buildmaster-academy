import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function ProjectTeaser() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <SectionHeader
            eyebrow="Portfolio case study"
            title="GitHub-ready project notes are included"
            description="The project page explains the product problem, stack choices, learning outcomes, and a README structure suitable for a portfolio repository."
          />

          <Link
            href="/project"
            className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel transition hover:-translate-y-1 hover:border-plasma/45 hover:bg-white/8"
          >
            <Github className="size-7 text-mint" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-bold text-white">Open project page</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Review the problem statement, technologies, future improvements, and README-ready copy.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-plasma">
              View documentation
              <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
