import type { CompatibilityData, Motherboard, RamType } from "@/types/buildmaster";

/**
 * Logika doboru płyty głównej — wydzielona z komponentu, żeby dało się ją
 * przetestować bez renderowania Reacta.
 *
 * Jest tu jedna rzecz, na którą warto uważać: to, że dla danego gniazda
 * ISTNIEJĄ płyty, ale ŻADNA nie obsługuje wybranej pamięci, to inny stan niż
 * "dla tego gniazda nie ma w bazie żadnej płyty". Pierwszy jest ostrzeżeniem
 * dla użytkownika ("kupisz niepasujący zestaw"), drugi to po prostu luka
 * w danych. Funkcja `hasRamMismatch` rozróżnia te dwa przypadki.
 */

/** Płyty pasujące do wybranego gniazda procesora. */
export function boardsForSocket(data: CompatibilityData, socket: string): Motherboard[] {
  return data.motherboards.filter((board) => board.socket === socket);
}

/** Płyty pasujące jednocześnie do gniazda i do wybranej generacji pamięci. */
export function boardsForSocketAndRam(
  data: CompatibilityData,
  socket: string,
  ramType: RamType
): Motherboard[] {
  return boardsForSocket(data, socket).filter((board) => board.ramType === ramType);
}

/**
 * Czy wybrana kombinacja gniazda i pamięci jest niemożliwa do złożenia.
 *
 * Zwraca `true` wyłącznie wtedy, gdy płyty dla tego gniazda istnieją, ale
 * żadna nie obsługuje wybranej pamięci. Brak jakichkolwiek płyt dla gniazda
 * daje `false` — to luka w danych, a nie błąd użytkownika, i ostrzeganie go
 * wtedy byłoby mylące.
 */
export function hasRamMismatch(
  data: CompatibilityData,
  socket: string,
  ramType: RamType
): boolean {
  const socketBoards = boardsForSocket(data, socket);
  return socketBoards.length > 0 && boardsForSocketAndRam(data, socket, ramType).length === 0;
}

/** Zdanie wyświetlane na karcie płyty. */
export function boardSummary(board: Motherboard, selectedRam: RamType): string {
  return board.ramType === selectedRam
    ? "Compatible with selected memory"
    : `Requires ${board.ramType}, not ${selectedRam}`;
}
