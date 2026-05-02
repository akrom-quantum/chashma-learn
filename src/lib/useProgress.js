"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Reads and writes unit completion state.
 * - Authenticated users: Firestore `unit_progress/{uid}_{unitSlug}`
 * - Guests: localStorage (migrated to Firestore on next sign-in)
 *
 * Returns { lessonRead, exercisesDone, toggle(type) }
 * type: "read" | "done"
 */
export function useProgress(unitSlug) {
  const { user } = useAuth();
  const [lessonRead,    setLessonRead]    = useState(false);
  const [exercisesDone, setExercisesDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unitSlug) { setLoading(false); return; }

    async function load() {
      try {
        if (user) {
          const snap = await getDoc(doc(db, "unit_progress", `${user.uid}_${unitSlug}`));
          if (snap.exists()) {
            setLessonRead(snap.data().lessonRead ?? false);
            setExercisesDone(snap.data().exercisesDone ?? false);
          }
        } else {
          setLessonRead(localStorage.getItem(`progress:${unitSlug}:read`) === "true");
          setExercisesDone(localStorage.getItem(`progress:${unitSlug}:done`) === "true");
        }
      } catch {
        // Firestore unavailable — silently degrade
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, unitSlug]);

  const toggle = useCallback(async (type) => {
    const isRead = type === "read";
    const next   = isRead ? !lessonRead : !exercisesDone;

    if (isRead) setLessonRead(next); else setExercisesDone(next);

    try {
      if (user) {
        await setDoc(
          doc(db, "unit_progress", `${user.uid}_${unitSlug}`),
          {
            uid:          user.uid,
            unitSlug,
            lessonRead:    isRead ? next : lessonRead,
            exercisesDone: isRead ? exercisesDone : next,
            updatedAt:     serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        localStorage.setItem(`progress:${unitSlug}:${type}`, String(next));
      }
    } catch {
      // Revert optimistic update on error
      if (isRead) setLessonRead(!next); else setExercisesDone(!next);
    }
  }, [user, unitSlug, lessonRead, exercisesDone]);

  return { lessonRead, exercisesDone, loading, toggle };
}
