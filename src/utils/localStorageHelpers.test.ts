import { vi } from 'vitest';
import { setLS, getLS, removeLS } from './localStorageHelpers';

export class LocalStorageMock {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  get length() {
    return Object.keys(this.store).length;
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

describe('localStorageHelpers', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('Sets data to local storage', () => {
    setLS('key', { value: 1 });
    expect(window.localStorage.getItem('key')).toEqual('{"value":1}');
  });

  it('Gets data from local storage', () => {
    setLS('key', { value: 1 });
    const data = getLS('key');
    expect(data).toEqual({ value: 1 });
  });

  it('Removes data from local storage', () => {
    setLS('key', { value: 1 });
    removeLS('key');
    expect(window.localStorage.getItem('key')).toEqual(null);
  });
});
