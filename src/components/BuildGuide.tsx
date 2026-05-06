"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import guideStepsData from "@/data/guideSteps.json";
import type { GuideStep } from "@/types/buildmaster";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

const guideSteps = guideStepsData as GuideStep[];
const storageKey = "buildmaster.checklist.v1";
const progressEvent = "buildmaster-progress";
const emptyProgress: string[] = [];
let cachedRawProgress = "";
let cachedProgress = emptyProgress;

function difficultyClass(difficulty: GuideStep["difficulty"]) {
  if (difficulty === "Easy") {
    return "border-mint/30 bg-mint/10 text-mint";
  }
  if (difficulty === "Careful") {
    return "border-warning/35 bg-warning/10 text-warning";
  }
  return "border-plasma/35 bg-plasma/10 text-plasma";
}

export function BuildGuide() {
  const completed = useSyncExternalStore(subscribeToProgress, readProgress, getServerProgress);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const percent = Math.round((completed.length / guideSteps.length) * 100);

  function toggleStep(id: string) {
    const nextProgress = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];

    writeProgress(nextProgress);
  }

  function resetProgress() {
    writeProgress([]);
  }

  return (
    <section id="guide" className="border-b border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Step-by-step academy"
            title="Build the PC in the right order"
            description="Each lesson focuses on the action, common mistakes, and a completion state that stays saved in the browser."
          />

          <div className="w-full rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel lg:max-w-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-300">Checklist progress</p>
                <p className="mt-1 text-3xl font-black text-white">{percent}%</p>
              </div>
              <button
                type="button"
                onClick={resetProgress}
                className="grid size-10 place-items-center rounded-lg border border-white/12 bg-white/8 text-slate-200 transition hover:border-warning/50 hover:bg-warning/10"
                aria-label="Reset checklist progress"
                title="Reset progress"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-plasma to-mint transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {completed.length} of {guideSteps.length} steps completed
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {guideSteps.map((step, index) => {
            const done = completedSet.has(step.id);
            return (
              <article
                key={step.id}
                className={cn(
                  "rounded-lg border bg-white/[0.045] p-5 shadow-panel transition hover:-translate-y-1 hover:border-plasma/45 hover:bg-white/8",
                  done ? "border-mint/45" : "border-white/10"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {String(index + 1).padStart(2, "0")} / {step.stage}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-lg border transition",
                      done
                        ? "border-mint/55 bg-mint/12 text-mint"
                        : "border-white/14 bg-white/7 text-slate-300 hover:border-plasma/45 hover:text-white"
                    )}
                    aria-label={done ? `Mark ${step.title} incomplete` : `Mark ${step.title} complete`}
                    title={done ? "Completed" : "Mark complete"}
                  >
                    {done ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={cn("rounded-lg border px-2.5 py-1 text-xs font-bold", difficultyClass(step.difficulty))}>
                    {step.difficulty}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/6 px-2.5 py-1 text-xs font-bold text-slate-300">
                    {step.duration}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-300">{step.summary}</p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">Core actions</h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {step.actions.map((action) => (
                        <li key={action} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-mint" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Mistakes to avoid</h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {step.mistakes.map((mistake) => (
                        <li key={mistake} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function subscribeToProgress(callback: () => void) {
  window.addEventListener(progressEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(progressEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerProgress() {
  return emptyProgress;
}

function readProgress() {
  try {
    const raw = window.localStorage.getItem(storageKey) ?? "[]";
    if (raw === cachedRawProgress) {
      return cachedProgress;
    }

    const parsed = JSON.parse(raw);
    cachedRawProgress = raw;
    cachedProgress = Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : emptyProgress;

    return cachedProgress;
  } catch {
    cachedRawProgress = "[]";
    cachedProgress = emptyProgress;
    return emptyProgress;
  }
}

function writeProgress(progress: string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
  window.dispatchEvent(new Event(progressEvent));
}
