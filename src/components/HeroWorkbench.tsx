import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Sparkles } from "lucide-react";

export function HeroWorkbench() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden border-b border-white/10">
      <div className="hero-workbench grid-lines" aria-hidden="true">
        <div className="case-frame">
          <div className="motherboard" />
          <div className="cpu-chip" />
          <div className="ram-stick" />
          <div className="ssd-stick" />
          <div className="gpu-card" />
          <div className="psu-box" />
          <div className="cable">
            <span className="pulse-dot" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-slate-200 backdrop-blur">
            <Sparkles className="size-4 text-mint" aria-hidden="true" />
            Interactive PC building path
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            BuildMaster Academy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Learn how to assemble a desktop PC through a hands-on guide, compatibility checks, budget builds, a saved checklist, and a fast quiz loop.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#guide"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-plasma px-5 py-3 text-sm font-bold text-ink transition hover:bg-mint"
            >
              Start the guide
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="#checker"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/16 bg-white/8 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-mint/50 hover:bg-mint/10"
            >
              Check compatibility
              <Cpu className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: CheckCircle2, label: "11 build steps", value: "Saved progress" },
            { icon: ShieldCheck, label: "Socket + RAM", value: "Compatibility warnings" },
            { icon: Cpu, label: "PLN budgets", value: "Realistic part lists" }
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/12 bg-white/8 p-4 backdrop-blur transition hover:border-plasma/45 hover:bg-white/12"
            >
              <item.icon className="mb-3 size-5 text-mint" aria-hidden="true" />
              <p className="text-sm font-bold text-white">{item.label}</p>
              <p className="mt-1 text-sm text-slate-300">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
