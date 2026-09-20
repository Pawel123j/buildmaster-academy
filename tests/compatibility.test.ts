/**
 * Testy sprawdzarki kompatybilności.
 *
 * To jedyne miejsce w aplikacji, gdzie zła odpowiedź kosztuje użytkownika
 * pieniądze: ktoś kupi płytę, która nie przyjmie jego pamięci. Dlatego
 * oprócz samego filtrowania sprawdzany jest tu przede wszystkim stan
 * ostrzeżenia — i to, żeby nie zapalało się w sytuacji, w której nie ma
 * o czym ostrzegać.
 */
import { describe, expect, it } from "vitest";

import compatibilityData from "@/data/compatibility.json";
import type { CompatibilityData, RamType } from "@/types/buildmaster";
import {
  boardSummary,
  boardsForSocket,
  boardsForSocketAndRam,
  hasRamMismatch
} from "@/lib/compatibility";

const data = compatibilityData as CompatibilityData;

const EMPTY: CompatibilityData = { sockets: [], ramTypes: [], motherboards: [] };

function board(id: string, socket: string, ramType: RamType) {
  return {
    id,
    name: `Board ${id}`,
    socket,
    chipset: "TEST",
    formFactor: "ATX",
    ramType,
    notes: "test"
  };
}

// ── spójność danych ─────────────────────────────────────────────────────

describe("dane kompatybilności", () => {
  it("ma gniazda, typy pamięci i płyty", () => {
    expect(data.sockets.length).toBeGreaterThan(0);
    expect(data.ramTypes.length).toBeGreaterThan(0);
    expect(data.motherboards.length).toBeGreaterThan(0);
  });

  it("każda płyta ma gniazdo z listy gniazd", () => {
    // Płyta o gnieździe spoza listy byłaby niewidoczna w interfejsie —
    // nie dałoby się wybrać jej gniazda.
    for (const b of data.motherboards) {
      expect(data.sockets).toContain(b.socket);
    }
  });

  it("każda płyta ma pamięć z listy typów pamięci", () => {
    for (const b of data.motherboards) {
      expect(data.ramTypes).toContain(b.ramType);
    }
  });

  it("identyfikatory płyt są unikalne", () => {
    // Powtórzony identyfikator rozwaliłby listę renderowaną po `key`.
    const ids = data.motherboards.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("każde gniazdo ma przynajmniej jedną płytę", () => {
    // Gniazdo bez płyt to pusty ekran po kliknięciu — użytkownik nie wie,
    // czy to błąd aplikacji, czy brak danych.
    for (const socket of data.sockets) {
      expect(boardsForSocket(data, socket).length).toBeGreaterThan(0);
    }
  });
});

// ── filtrowanie ─────────────────────────────────────────────────────────

describe("boardsForSocket", () => {
  it("zwraca wyłącznie płyty o wybranym gnieździe", () => {
    for (const socket of data.sockets) {
      for (const b of boardsForSocket(data, socket)) {
        expect(b.socket).toBe(socket);
      }
    }
  });

  it("nieznane gniazdo daje pustą listę zamiast błędu", () => {
    expect(boardsForSocket(data, "SOCKET-KTÓREGO-NIE-MA")).toEqual([]);
  });

  it("suma płyt po wszystkich gniazdach równa się liczbie wszystkich płyt", () => {
    // Czyli: żadna płyta nie gubi się i żadna nie jest liczona dwa razy.
    const total = data.sockets
      .map((s) => boardsForSocket(data, s).length)
      .reduce((a, b) => a + b, 0);
    expect(total).toBe(data.motherboards.length);
  });
});

describe("boardsForSocketAndRam", () => {
  it("zawęża wynik do wybranej pamięci", () => {
    for (const socket of data.sockets) {
      for (const ram of data.ramTypes) {
        for (const b of boardsForSocketAndRam(data, socket, ram)) {
          expect(b.socket).toBe(socket);
          expect(b.ramType).toBe(ram);
        }
      }
    }
  });

  it("wynik jest zawsze podzbiorem płyt danego gniazda", () => {
    for (const socket of data.sockets) {
      const all = boardsForSocket(data, socket).map((b) => b.id);
      for (const ram of data.ramTypes) {
        for (const b of boardsForSocketAndRam(data, socket, ram)) {
          expect(all).toContain(b.id);
        }
      }
    }
  });
});

// ── ostrzeżenie ─────────────────────────────────────────────────────────

describe("hasRamMismatch", () => {
  it("ostrzega, gdy płyty dla gniazda istnieją, ale żadna nie przyjmie tej pamięci", () => {
    const only5: CompatibilityData = {
      sockets: ["AM5"],
      ramTypes: ["DDR4", "DDR5"],
      motherboards: [board("a", "AM5", "DDR5"), board("b", "AM5", "DDR5")]
    };

    expect(hasRamMismatch(only5, "AM5", "DDR4")).toBe(true);
    expect(hasRamMismatch(only5, "AM5", "DDR5")).toBe(false);
  });

  it("NIE ostrzega, gdy dla gniazda nie ma w ogóle żadnej płyty", () => {
    // To jest cała różnica, dla której ta funkcja istnieje osobno.
    // Brak płyt to luka w danych, a nie zła decyzja użytkownika —
    // ostrzeżenie "te płyty nie obsługują DDR4" przy zerowej liczbie płyt
    // byłoby zwyczajnie nieprawdziwe.
    expect(hasRamMismatch(EMPTY, "AM5", "DDR4")).toBe(false);
    expect(hasRamMismatch(data, "SOCKET-KTÓREGO-NIE-MA", "DDR5")).toBe(false);
  });

  it("ostrzeżenie jest zgodne z liczbą pasujących płyt", () => {
    // Niezmiennik wiążący ostrzeżenie z tym, co widzi użytkownik: ostrzeżenie
    // zapala się dokładnie wtedy, gdy lista pasujących płyt jest pusta,
    // a lista płyt dla gniazda nie.
    for (const socket of data.sockets) {
      for (const ram of data.ramTypes) {
        const socketBoards = boardsForSocket(data, socket);
        const matching = boardsForSocketAndRam(data, socket, ram);
        expect(hasRamMismatch(data, socket, ram)).toBe(
          socketBoards.length > 0 && matching.length === 0
        );
      }
    }
  });
});

// ── opis na karcie ──────────────────────────────────────────────────────

describe("boardSummary", () => {
  it("potwierdza zgodność, gdy pamięć się zgadza", () => {
    expect(boardSummary(board("x", "AM5", "DDR5"), "DDR5")).toBe(
      "Compatible with selected memory"
    );
  });

  it("przy niezgodności mówi, czego płyta wymaga i co jest wybrane", () => {
    const text = boardSummary(board("x", "AM4", "DDR4"), "DDR5");
    expect(text).toContain("DDR4");
    expect(text).toContain("DDR5");
  });

  it("dla każdej płyty w danych zwraca niepusty opis", () => {
    for (const b of data.motherboards) {
      for (const ram of data.ramTypes) {
        expect(boardSummary(b, ram).trim()).not.toBe("");
      }
    }
  });
});
