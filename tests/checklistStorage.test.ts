import { beforeEach, describe, expect, it } from "vitest";
import { checklistRecoveryCopies, checklistStorageKey, persistChecklist } from "@/lib/checklistStorage";

function memoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    key: index => [...values.keys()][index] ?? null,
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value); },
    removeItem: key => { values.delete(key); },
    clear: () => values.clear()
  };
}
let storage: Storage;
beforeEach(() => { storage = memoryStorage(); });

describe("checklist recovery before replacement", () => {
  it.each([' {"broken":', '{"version":99,"completed":["cpu"]}', '{"other":"saved progress"}'])("preserves exact unsupported source %s", raw => {
    storage.setItem(checklistStorageKey, raw);
    persistChecklist(storage, ["cpu"]);
    expect(checklistRecoveryCopies(storage).map(copy => copy.raw)).toEqual([raw]);
    expect(JSON.parse(storage.getItem(checklistStorageKey)!)).toEqual({ version: 2, completed: ["cpu"] });
  });

  it("leaves the original untouched when the backup write fails, then retries", () => {
    const raw = '{"partial":';
    storage.setItem(checklistStorageKey, raw);
    const setItem = storage.setItem;
    storage.setItem = (key, value) => {
      if (key !== checklistStorageKey) throw new DOMException("Full", "QuotaExceededError");
      setItem(key, value);
    };
    expect(() => persistChecklist(storage, ["cpu"])).toThrow();
    expect(storage.getItem(checklistStorageKey)).toBe(raw);
    storage.setItem = setItem;
    persistChecklist(storage, ["cpu"]);
    expect(checklistRecoveryCopies(storage).map(copy => copy.raw)).toEqual([raw]);
  });

  it("fails closed on a read failure even if writes would be allowed", () => {
    storage.setItem(checklistStorageKey, "original");
    const getItem = storage.getItem;
    storage.getItem = () => { throw new DOMException("Blocked", "SecurityError"); };
    expect(() => persistChecklist(storage, [])).toThrow();
    expect(getItem(checklistStorageKey)).toBe("original");
  });

  it("verifies the backup before touching the primary record", () => {
    storage.setItem(checklistStorageKey, "original");
    const setItem = storage.setItem;
    storage.setItem = (key, value) => { if (key === checklistStorageKey) setItem(key, value); };
    expect(() => persistChecklist(storage, [])).toThrow("verified");
    expect(storage.getItem(checklistStorageKey)).toBe("original");
  });

  it("reuses a verified backup after a failed primary write, and preserves a later different corruption on reset", () => {
    storage.setItem(checklistStorageKey, "first broken source");
    const setItem = storage.setItem;
    storage.setItem = (key, value) => {
      if (key === checklistStorageKey) throw new DOMException("Full", "QuotaExceededError");
      setItem(key, value);
    };
    expect(() => persistChecklist(storage, ["cpu"])).toThrow();
    expect(() => persistChecklist(storage, ["cpu"])).toThrow();
    expect(checklistRecoveryCopies(storage)).toHaveLength(1);
    storage.setItem = setItem;
    storage.setItem(checklistStorageKey, "second broken source");
    persistChecklist(storage, []);
    expect(checklistRecoveryCopies(storage).map(copy => copy.raw)).toEqual(["first broken source", "second broken source"]);
    expect(JSON.parse(storage.getItem(checklistStorageKey)!)).toEqual({ version: 2, completed: [] });
  });

  it.each(['["cpu"]', '{"version":2,"completed":["cpu"]}'])("keeps supported legacy/current writes lightweight: %s", raw => {
    storage.setItem(checklistStorageKey, raw);
    persistChecklist(storage, ["cpu", "ram"]);
    expect(checklistRecoveryCopies(storage)).toEqual([]);
  });
});
