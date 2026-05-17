"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe hook returning the user's `prefers-reduced-motion` preference.
 *
 * Uses `useSyncExternalStore` so that:
 * - The server snapshot is `false` (no flicker mismatch).
 * - The client snapshot is read synchronously from the matchMedia store.
 * - Subscriptions update React when the OS preference changes.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
