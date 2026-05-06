"use client";

import { useMemo, useState } from "react";
import { WalletCards } from "lucide-react";
import budgetBuildsData from "@/data/budgetBuilds.json";
import type { BudgetBuild } from "@/types/buildmaster";
import { cn, formatPln } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

const builds = budgetBuildsData as BudgetBuild[];

export function BudgetBuilder() {
  const [selectedId, setSelectedId] = useState(builds[0]?.id ?? "");
  const selected = builds.find((build) => build.id === selectedId) ?? builds[0];

  const total = useMemo(() => {
    if (!selected) {
      return 0;
    }
    return selected.parts.reduce((sum, part) => sum + part.price, 0);
  }, [selected]);

  if (!selected) {
    return null;
  }

  return (
    <section id="budget" className="border-b border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Budget PC builder"
          title="Pick a PLN target and compare tradeoffs"
          description="Each preset shows suggested parts, approximate Polish pricing, and the purpose of the build tier."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3">
            {builds.map((build) => (
              <button
                key={build.id}
                type="button"
                onClick={() => setSelectedId(build.id)}
                className={cn(
                  "rounded-lg border p-5 text-left transition hover:-translate-y-1",
                  selected.id === build.id
                    ? "border-plasma bg-plasma/14 shadow-glow"
                    : "border-white/10 bg-white/[0.045] hover:border-plasma/45 hover:bg-white/8"
                )}
              >
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">
                  {formatPln(build.budget)}
                </span>
                <span className="mt-2 block text-xl font-bold text-white">{build.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">{build.audience}</span>
              </button>
            ))}
          </div>

          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{selected.label}</p>
                <h3 className="mt-2 text-3xl font-black text-white">{formatPln(total)}</h3>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/6 px-4 py-3">
                <WalletCards className="size-5 text-plasma" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-200">{formatPln(selected.budget - total)} buffer</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-300">{selected.focus}</p>

            <div className="mt-6 divide-y divide-white/10">
              {selected.parts.map((part) => (
                <div key={`${part.category}-${part.name}`} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-400">{part.category}</p>
                    <p className="mt-1 font-bold text-white">{part.name}</p>
                  </div>
                  <p className="shrink-0 text-sm font-black text-mint">{formatPln(part.price)}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
