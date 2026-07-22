import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "scholarnaija:saved";
const EVENT_NAME = "scholarnaija:saved-changed";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeSaved(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function useSavedScholarships() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(readSaved());
    const handler = () => setSavedIds(readSaved());
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSaved = useCallback((id: string) => {
    const current = readSaved();
    const next = current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id];
    writeSaved(next);
    setSavedIds(next);
  }, []);

  return { savedIds, isSaved, toggleSaved };
}
