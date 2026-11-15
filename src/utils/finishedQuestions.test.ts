import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Store = typeof import("./finishedQuestions");

class MemoryStorage {
  items = new Map<string, string>();
  getItem(key: string) { return this.items.get(key) ?? null; }
  setItem(key: string, value: string) { this.items.set(key, value); }
}

class BlockedStorage {
  getItem(): string | null { throw new Error("SecurityError"); }
  setItem() { throw new Error("SecurityError"); }
}

// Each test gets a fresh copy of the module, since it caches what it read.
async function loadStore(storage: object, events = new EventTarget()): Promise<Store> {
  vi.stubGlobal("localStorage", storage);
  vi.stubGlobal("window", events);
  vi.resetModules();
  return import("./finishedQuestions");
}

function storageEvent(key: string | null): Event {
  return Object.assign(new Event("storage"), { key });
}

describe("finished questions store", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("toggles a question and saves the list", async () => {
    const store = await loadStore(storage);
    store.toggleFinished("fall2017", "3");
    expect(store.getFinishedKeys().has("fall2017:3")).toBe(true);
    expect(JSON.parse(storage.getItem(store.STORAGE_KEY)!)).toEqual(["fall2017:3"]);

    store.toggleFinished("fall2017", "3");
    expect(store.getFinishedKeys().has("fall2017:3")).toBe(false);
  });

  it("returns the same snapshot until something changes", async () => {
    const store = await loadStore(storage);
    const before = store.getFinishedKeys();
    expect(store.getFinishedKeys()).toBe(before);
    store.toggleFinished("fall2017", "1");
    expect(store.getFinishedKeys()).not.toBe(before);
  });

  it("tells every subscriber about a change", async () => {
    const store = await loadStore(storage);
    const first = vi.fn();
    const second = vi.fn();
    store.subscribeToFinishedKeys(first);
    const unsubscribe = store.subscribeToFinishedKeys(second);
    unsubscribe();

    store.toggleFinished("fall2017", "1");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
  });

  it("falls back to the old storage key", async () => {
    storage.setItem("cisc-1115-visited-questions", JSON.stringify(["spring2023:5a"]));
    const store = await loadStore(storage);
    expect([...store.getFinishedKeys()]).toEqual(["spring2023:5a"]);
  });

  it("ignores stored values that are not a list of strings", async () => {
    storage.setItem("cisc-1115-finished-questions", "{not json");
    storage.setItem("cisc-1115-visited-questions", JSON.stringify(["fall2018:2", 7, null]));
    const store = await loadStore(storage);
    expect([...store.getFinishedKeys()]).toEqual(["fall2018:2"]);
  });

  it("picks up changes made in another tab", async () => {
    const events = new EventTarget();
    const store = await loadStore(storage, events);
    const listener = vi.fn();
    store.subscribeToFinishedKeys(listener);

    storage.setItem(store.STORAGE_KEY, JSON.stringify(["fall2020:4"]));
    events.dispatchEvent(storageEvent("maple-theme"));
    expect(listener).not.toHaveBeenCalled();

    events.dispatchEvent(storageEvent(store.STORAGE_KEY));
    expect(listener).toHaveBeenCalledTimes(1);
    expect(store.getFinishedKeys().has("fall2020:4")).toBe(true);
  });

  it("keeps working when storage is blocked", async () => {
    const store = await loadStore(new BlockedStorage());
    expect(store.getFinishedKeys().size).toBe(0);
    expect(() => store.toggleFinished("fall2017", "3")).not.toThrow();
    expect(store.getFinishedKeys().has("fall2017:3")).toBe(true);
  });
});
