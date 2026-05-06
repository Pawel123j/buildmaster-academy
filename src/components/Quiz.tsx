"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import quizData from "@/data/quizQuestions.json";
import type { QuizQuestion } from "@/types/buildmaster";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

const questions = quizData as QuizQuestion[];

export function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const current = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const score = useMemo(
    () =>
      questions.reduce((sum, question) => {
        return answers[question.id] === question.answerIndex ? sum + 1 : sum;
      }, 0),
    [answers]
  );

  function chooseAnswer(answerIndex: number) {
    if (!current) {
      return;
    }

    setAnswers((existing) => ({
      ...existing,
      [current.id]: answerIndex
    }));

    window.setTimeout(() => {
      setCurrentIndex((index) => index + 1);
    }, 420);
  }

  function restart() {
    setAnswers({});
    setCurrentIndex(0);
  }

  return (
    <section id="quiz" className="border-b border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Quiz lab"
          title="Test what you would do at the workbench"
          description="Answer fast practical questions about sockets, RAM slots, power cables, BIOS, and first-boot troubleshooting."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel">
            <BrainCircuit className="size-8 text-mint" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Current score</p>
            <p className="mt-2 text-5xl font-black text-white">
              {score}/{questions.length}
            </p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-plasma to-mint transition-all duration-500"
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {Math.min(currentIndex, questions.length)} of {questions.length} answered
            </p>
          </div>

          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel">
            {isFinished ? (
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Result</p>
                <h3 className="mt-3 text-3xl font-black text-white">
                  {score >= questions.length - 1 ? "Workbench ready" : score >= 4 ? "Solid builder instincts" : "Review the guide and try again"}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  You scored {score} out of {questions.length}. The explanations below show the key build principles behind each answer.
                </p>

                <div className="mt-6 divide-y divide-white/10">
                  {questions.map((question) => {
                    const selected = answers[question.id];
                    const correct = selected === question.answerIndex;
                    return (
                      <div key={question.id} className="py-4">
                        <div className="flex gap-3">
                          {correct ? (
                            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mint" aria-hidden="true" />
                          ) : (
                            <XCircle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
                          )}
                          <div>
                            <p className="font-bold text-white">{question.question}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-300">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={restart}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 py-3 text-sm font-bold text-white transition hover:border-mint/45 hover:bg-mint/10"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Restart quiz
                </button>
              </div>
            ) : current ? (
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Question {currentIndex + 1}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">{current.question}</h3>

                <div className="mt-6 grid gap-3">
                  {current.options.map((option, index) => {
                    const selected = answers[current.id] === index;
                    const isCorrect = index === current.answerIndex;
                    const answered = answers[current.id] !== undefined;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => chooseAnswer(index)}
                        disabled={answered}
                        className={cn(
                          "rounded-lg border p-4 text-left text-sm font-semibold transition",
                          answered && isCorrect
                            ? "border-mint/45 bg-mint/12 text-white"
                            : selected
                              ? "border-warning/45 bg-warning/10 text-white"
                              : "border-white/10 bg-white/6 text-slate-200 hover:border-plasma/45 hover:bg-white/10"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  );
}
