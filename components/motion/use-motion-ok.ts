"use client";

import { useEffect, useState } from "react";

/**
 * False when the visitor asked their system for less motion. Everything in
 * this folder checks it and falls back to a plain, static render.
 */
export function useMotionOk() {
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setOk(!query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  return ok;
}

/**
 * True only for a real pointer. Tilt and magnetic pulls are driven by hover,
 * so on a touch screen they would either never fire or fire on a tap and
 * stick, and they are skipped there entirely.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const read = () => setFine(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  return fine;
}
