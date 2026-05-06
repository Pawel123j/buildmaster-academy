import Link from "next/link";
import { Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-violetline/50 bg-violetline/18">
            <Cpu className="size-4 text-mint" aria-hidden="true" />
          </span>
          <span>BuildMaster Academy</span>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/project" className="transition hover:text-white">
            Project
          </Link>
        </div>
      </div>
    </footer>
  );
}
