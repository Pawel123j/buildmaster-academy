"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Cpu, ShieldCheck } from "lucide-react";
import compatibilityData from "@/data/compatibility.json";
import type { CompatibilityData, RamType } from "@/types/buildmaster";
import {
  boardSummary,
  boardsForSocket,
  boardsForSocketAndRam,
  hasRamMismatch
} from "@/lib/compatibility";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

const data = compatibilityData as CompatibilityData;

export function CompatibilityChecker() {
  const [socket, setSocket] = useState(data.sockets[0] ?? "AM5");
  const [ramType, setRamType] = useState<RamType>(data.ramTypes[0] ?? "DDR4");

  const socketBoards = useMemo(() => boardsForSocket(data, socket), [socket]);
  const matchingBoards = useMemo(
    () => boardsForSocketAndRam(data, socket, ramType),
    [ramType, socket]
  );
  const hasWarning = useMemo(() => hasRamMismatch(data, socket, ramType), [ramType, socket]);

  return (
    <section id="checker" className="border-b border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compatibility checker"
          title="Match the platform before buying"
          description="Choose a CPU socket and RAM generation to reveal compatible motherboards and highlight risky combinations."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel">
            <div className="flex items-center gap-3">
              <Cpu className="size-5 text-mint" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white">Selections</h3>
            </div>

            <div className="mt-6 space-y-6">
              <fieldset>
                <legend className="text-sm font-semibold text-slate-300">CPU socket</legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {data.sockets.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSocket(item)}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-sm font-bold transition",
                        socket === item
                          ? "border-plasma bg-plasma/18 text-white"
                          : "border-white/10 bg-white/6 text-slate-300 hover:border-plasma/45 hover:text-white"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-slate-300">RAM type</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {data.ramTypes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRamType(item)}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-sm font-bold transition",
                        ramType === item
                          ? "border-mint bg-mint/14 text-white"
                          : "border-white/10 bg-white/6 text-slate-300 hover:border-mint/45 hover:text-white"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div
              className={cn(
                "mt-6 rounded-lg border p-4",
                hasWarning ? "border-warning/40 bg-warning/10" : "border-mint/30 bg-mint/10"
              )}
            >
              <div className="flex gap-3">
                {hasWarning ? (
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
                ) : (
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-mint" aria-hidden="true" />
                )}
                <p className="text-sm leading-6 text-slate-200">
                  {hasWarning
                    ? `${socket} boards in this dataset do not support ${ramType}. Pick a matching memory generation before buying.`
                    : `${matchingBoards.length} ${socket} motherboard${matchingBoards.length === 1 ? "" : "s"} support ${ramType} in this dataset.`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {socketBoards.map((board) => {
              const isCompatible = board.ramType === ramType;
              return (
                <article
                  key={board.id}
                  className={cn(
                    "rounded-lg border bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:bg-white/8",
                    isCompatible ? "border-mint/35" : "border-warning/35"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {board.chipset} / {board.formFactor}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-white">{board.name}</h3>
                    </div>
                    <span
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-xs font-bold",
                        isCompatible ? "border-mint/35 bg-mint/10 text-mint" : "border-warning/35 bg-warning/10 text-warning"
                      )}
                    >
                      {board.ramType}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{board.notes}</p>
                  <p className={cn("mt-4 text-sm font-semibold", isCompatible ? "text-mint" : "text-warning")}>
                    {boardSummary(board, ramType)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
