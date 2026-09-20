import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";

/**
 * Wspólna ramka dla podstron z pojedynczym narzędziem.
 *
 * Każde narzędzie ma własny adres, żeby dało się je podlinkować wprost —
 * wysłanie komuś `/compatibility` jest czymś innym niż wysłanie strony
 * głównej z prośbą, żeby przewinął do sekcji. Strona główna nadal pokazuje
 * wszystko po kolei; podstrony renderują te same komponenty, więc nie ma
 * dwóch wersji tej samej treści do utrzymania.
 */
export function ToolPage({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
