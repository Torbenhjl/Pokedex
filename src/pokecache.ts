export type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval * 1000; // seconds -> milliseconds
    this.#startReapLoop();
  }

  stopReapLoop(): void {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }

  #reap(): void {
    for (const [key, entry] of this.#cache) {
      if (entry.createdAt < Date.now() - this.#interval) {
        console.log("CACHE REAP:", key);
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(
      () => this.#reap(),
      this.#interval,
    );
  }

  add<T>(key: string, val: T): void {
    console.log("CACHE ADD:", key);

    this.#cache.set(key, {
      createdAt: Date.now(),
      val,
    });
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);

    if (!entry) {
      console.log("CACHE MISS:", key);
      return undefined;
    }

    console.log("CACHE HIT:", key);
    return entry.val as T;
  }
}
