import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, Cpu, GraduationCap, Layers, Rocket } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Footer } from "@/components/Footer";

const technologies = [
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "React client components",
  "Local JSON mock data",
  "Browser localStorage"
];

const learnings = [
  "Designing educational flows around a real-world build sequence",
  "Keeping interactive state client-side without paid APIs or a backend",
  "Modeling compatibility data so warnings are understandable",
  "Balancing portfolio polish with a clean, maintainable folder structure"
];

const readmeSections = [
  "Project overview and learning goal",
  "Feature list with interactive modules",
  "Tech stack and local installation",
  "Mock data structure",
  "Future improvements for a full learning platform"
];

export default function ProjectPage() {
  return (
    <>
      <AppHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 py-20">
          <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-mint/45 hover:bg-mint/10"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to academy
            </Link>

            <div className="mt-10 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-mint">Project page</p>
              <h1 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">BuildMaster Academy case study</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                A portfolio-ready educational web app that helps beginners understand the order, compatibility decisions, and practical checks involved in building a desktop PC.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-16">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {[
              {
                icon: GraduationCap,
                title: "Problem solved",
                copy: "First-time builders often struggle with part compatibility, build order, and confidence before first boot."
              },
              {
                icon: Cpu,
                title: "Product approach",
                copy: "The app turns the process into interactive lessons, checks, budget presets, saved progress, and quiz feedback."
              },
              {
                icon: Code2,
                title: "Engineering focus",
                copy: "The project uses typed mock data and reusable components so it is easy to expand without a backend."
              },
              {
                icon: Rocket,
                title: "Portfolio value",
                copy: "It demonstrates UX thinking, state persistence, data modeling, and responsive frontend implementation."
              }
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <item.icon className="size-6 text-mint" aria-hidden="true" />
                <h2 className="mt-5 text-lg font-bold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <article className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel">
              <Layers className="size-7 text-plasma" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-white">Technologies used</h2>
              <div className="mt-5 space-y-3">
                {technologies.map((technology) => (
                  <div key={technology} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="size-4 text-mint" aria-hidden="true" />
                    {technology}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel">
              <GraduationCap className="size-7 text-plasma" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-white">What I learned</h2>
              <div className="mt-5 space-y-3">
                {learnings.map((learning) => (
                  <div key={learning} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-mint" />
                    {learning}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel">
              <Code2 className="size-7 text-plasma" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-white">README structure</h2>
              <div className="mt-5 space-y-3">
                {readmeSections.map((section) => (
                  <div key={section} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                    {section}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-mint">GitHub-ready README</p>
              <h2 className="mt-3 text-3xl font-black text-white">Repository summary</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  BuildMaster Academy is a dark, responsive Next.js web application for learning how to build a desktop PC. It combines an ordered build guide, compatibility warnings, budget PC presets, progress persistence, and a quiz module.
                </p>
                <p>
                  The app runs fully locally with JSON mock data, uses no paid APIs, and is structured with reusable React components for portfolio-friendly maintenance.
                </p>
                <p>
                  Future versions could add search, printable checklists, richer part filtering, accessibility preference controls, and user-created build plans.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
