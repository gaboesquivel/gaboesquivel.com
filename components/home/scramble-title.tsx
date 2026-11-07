"use client";

import { useEffect } from "react";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?*+-=_";
const DURATION = 900;

let played = false;

/**
 * Experiment: scrambles the homepage h1 once per page load, then settles on
 * the real text, left to right. No library; skipped under reduced motion.
 */
export function ScrambleTitle() {
  useEffect(() => {
    if (played) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const h1 = document.querySelector("h1");
    if (!h1) return;

    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    const nodes: { node: Text; text: string }[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const node = n as Text;
      if (node.data.trim()) nodes.push({ node, text: node.data });
    }

    const label = h1.textContent ?? "";
    h1.setAttribute("aria-label", label);

    const total = nodes.reduce((sum, { text }) => sum + text.length, 0);
    const parts = nodes.map((entry, index) => ({
      ...entry,
      base: nodes
        .slice(0, index)
        .reduce((sum, { text }) => sum + text.length, 0),
    }));
    const start = performance.now();
    let frame = 0;

    const render = (now: number) => {
      const t = now - start;
      for (const { node, text, base } of parts) {
        node.data = [...text]
          .map((char, i) => {
            if (char === " ") return char;
            const reveal =
              ((base + i) / total) * (DURATION * 0.6) + DURATION * 0.4;
            return t >= reveal
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      }
      if (t < DURATION) {
        frame = requestAnimationFrame(render);
      } else {
        played = true;
        for (const { node, text } of nodes) node.data = text;
        h1.removeAttribute("aria-label");
      }
    };

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      for (const { node, text } of nodes) node.data = text;
      h1.removeAttribute("aria-label");
    };
  }, []);

  return null;
}
