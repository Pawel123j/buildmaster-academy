"use client";

import Link from "next/link";
import { useState } from "react";
import { Cpu, Github, Menu, X } from "lucide-react";

const navItems = [
  { href: "/#guide", label: "Guide" },
  { href: "/#checker", label: "Checker" },
  { href: "/#budget", label: "Budgets" },
  { href: "/#quiz", label: "Quiz" },
  { href: "/project", label: "Project" }
];

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="BuildMaster Academy home">
          <span className="grid size-10 place-items-center rounded-lg border border-violetline/50 bg-violetline/18 shadow-glow">
            <Cpu className="size-5 text-mint" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-plasma">BuildMaster</span>
            <span className="block text-base font-bold text-white">Academy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/project"
            className="hidden items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-sm font-semibold text-white transition hover:border-mint/45 hover:bg-mint/10 sm:flex"
          >
            <Github className="size-4" aria-hidden="true" />
            README
          </Link>
          <button
            className="grid size-10 place-items-center rounded-lg border border-white/12 bg-white/6 text-slate-200 md:hidden"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Open navigation menu"
            title="Navigation"
          >
            {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isOpen ? (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-white/10 bg-white/6 px-3 py-3 text-sm font-semibold text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
