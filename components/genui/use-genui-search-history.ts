"use client";

import {
  GENUI_SEARCH_HISTORY_EVENT,
  GENUI_SEARCH_HISTORY_KEY,
  parseGenuiSearchHistory,
} from "lib/genui/search-history";
import { useSyncExternalStore } from "react";

const emptyGenuiSearchHistory: string[] = [];

let cachedHistoryRaw: string | null | undefined;
let cachedHistorySnapshot: string[] = emptyGenuiSearchHistory;

const subscribeGenuiSearchHistory = (onStoreChange: () => void) => {
  const onCustomUpdate = () => onStoreChange();
  const onStorageUpdate = (event: StorageEvent) => {
    if (event.key !== GENUI_SEARCH_HISTORY_KEY) return;
    onStoreChange();
  };
  window.addEventListener(GENUI_SEARCH_HISTORY_EVENT, onCustomUpdate);
  window.addEventListener("storage", onStorageUpdate);
  return () => {
    window.removeEventListener(GENUI_SEARCH_HISTORY_EVENT, onCustomUpdate);
    window.removeEventListener("storage", onStorageUpdate);
  };
};

const getGenuiSearchHistorySnapshot = () => {
  const raw = window.localStorage.getItem(GENUI_SEARCH_HISTORY_KEY);
  if (raw === cachedHistoryRaw) return cachedHistorySnapshot;
  cachedHistoryRaw = raw;
  const parsed = parseGenuiSearchHistory(raw);
  cachedHistorySnapshot =
    parsed.length === 0 ? emptyGenuiSearchHistory : parsed;
  return cachedHistorySnapshot;
};

const getServerGenuiSearchHistorySnapshot = () => emptyGenuiSearchHistory;

export const useGenuiSearchHistory = () =>
  useSyncExternalStore(
    subscribeGenuiSearchHistory,
    getGenuiSearchHistorySnapshot,
    getServerGenuiSearchHistorySnapshot
  );
