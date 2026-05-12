"use client";

import { useEffect, useRef, useState } from "react";
import { AlbumCorner } from "@/components/AlbumCorner";

type WorksAlbumViewCursorProps = {
  /** Clamped target px from the left of the album link */
  targetLeft: number;
  /** Clamped target px from the top of the album link */
  targetTop: number;
  visible: boolean;
  /** Badge label (default matches Works album tiles). */
  label?: string;
};

const LERP = 0.18;
const SNAP_EPS2 = 0.2;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/**
 * “VIEW” label (58×58), absolute inside the card. Position is smoothed toward the pointer with a
 * short exponential lag (rAF lerp). Small L-corners on all sides.
 */
export function WorksAlbumViewCursor({
  targetLeft,
  targetTop,
  visible,
  label = "VIEW",
}: WorksAlbumViewCursorProps) {
  const reducedMotion = usePrefersReducedMotion();
  const targetRef = useRef({ left: targetLeft, top: targetTop });
  const posRef = useRef({ left: targetLeft, top: targetTop });
  const [pos, setPos] = useState({ left: targetLeft, top: targetTop });
  const rafRef = useRef<number | null>(null);
  const prevVisible = useRef(false);

  useEffect(() => {
    targetRef.current = { left: targetLeft, top: targetTop };
  }, [targetLeft, targetTop]);

  /* Snap to target when the badge first appears */
  useEffect(() => {
    if (visible && !prevVisible.current) {
      posRef.current = { left: targetLeft, top: targetTop };
      setPos({ left: targetLeft, top: targetTop });
    }
    prevVisible.current = visible;
  }, [visible, targetLeft, targetTop]);

  /* Reduced motion: follow target immediately, no lerp loop */
  useEffect(() => {
    if (!visible || !reducedMotion) return;
    posRef.current = { left: targetLeft, top: targetTop };
    setPos({ left: targetLeft, top: targetTop });
  }, [visible, reducedMotion, targetLeft, targetTop]);

  useEffect(() => {
    if (!visible || reducedMotion) {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = () => {
      const t = targetRef.current;
      const p = posRef.current;
      const dl = t.left - p.left;
      const dt = t.top - p.top;

      if (dl * dl + dt * dt < SNAP_EPS2) {
        if (p.left !== t.left || p.top !== t.top) {
          posRef.current = { left: t.left, top: t.top };
          setPos({ left: t.left, top: t.top });
        }
      } else {
        posRef.current = {
          left: p.left + dl * LERP,
          top: p.top + dt * LERP,
        };
        setPos({ ...posRef.current });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [visible, reducedMotion]);

  return (
    <div
      className={[
        "works__album-view-cursor",
        visible && "works__album-view-cursor--visible",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ left: pos.left, top: pos.top }}
      aria-hidden
    >
      <div className="works__album-view-cursor__frame">
        <AlbumCorner
          variant="light"
          placement="tl"
          size="small"
          className="works__album-corner--view-badge"
        />
        <AlbumCorner
          variant="light"
          placement="tr"
          size="small"
          className="works__album-corner--view-badge"
        />
        <AlbumCorner
          variant="light"
          placement="bl"
          size="small"
          className="works__album-corner--view-badge"
        />
        <AlbumCorner
          variant="light"
          placement="br"
          size="small"
          className="works__album-corner--view-badge"
        />
        <p className="works__album-view-cursor__label">{label}</p>
      </div>
    </div>
  );
}
