export const checklistStorageKey = "buildmaster.checklist.v1";
const recoveryPrefix = "buildmaster.checklist.recovery.";

/** Both historical arrays and the current versioned format remain supported. */
export function decodeChecklist(raw: string): unknown[] {
  const parsed: unknown = JSON.parse(raw);
  const completed = Array.isArray(parsed) ? parsed :
    parsed && typeof parsed === "object" && "version" in parsed && parsed.version === 2 && "completed" in parsed
      ? parsed.completed : null;
  if (!Array.isArray(completed)) throw new Error("Invalid progress");
  return completed;
}

export function checklistRecoveryCopies(storage: Storage): Array<{ key: string; raw: string }> {
  const copies: Array<{ key: string; raw: string }> = [];
  for (let index = 0; index < storage.length; index++) {
    const key = storage.key(index);
    if (key?.startsWith(recoveryPrefix)) {
      const raw = storage.getItem(key);
      if (raw !== null) copies.push({ key, raw });
    }
  }
  return copies;
}

/** Read again for every write, including retry/reset. Never replace unreadable
 * data unless its exact original bytes have a separately verified saved copy. */
export function persistChecklist(storage: Storage, progress: string[]): void {
  const original = storage.getItem(checklistStorageKey);
  let needsBackup = false;
  if (original !== null) {
    try { decodeChecklist(original); } catch { needsBackup = true; }
  }
  if (needsBackup && original !== null) {
    const copies = checklistRecoveryCopies(storage);
    if (!copies.some(copy => copy.raw === original)) {
      const key = `${recoveryPrefix}${crypto.randomUUID()}`;
      if (storage.getItem(key) !== null) throw new Error("Recovery key collision");
      storage.setItem(key, original);
      if (storage.getItem(key) !== original) throw new Error("Recovery copy could not be verified");
    }
  }
  storage.setItem(checklistStorageKey, JSON.stringify({ version: 2, completed: progress }));
}
