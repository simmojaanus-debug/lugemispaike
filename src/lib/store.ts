import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { durableStorage } from "./durable-storage";
import { todayISO, yesterdayISO } from "./utils";

export type Overlay = "cream" | "lemon" | "sky" | "mint";
export type FontScale = 1 | 1.15 | 1.3 | 1.5;
export type Tracking = "normal" | "wide" | "wider";
export type Level = "easy" | "grade3" | "stretch";
export type SessionPhase = "intro" | "words" | "story" | "question" | "quiz" | "done";

export type SessionProgress = {
  date: string;
  phase: SessionPhase;
  wordI: number;
};

type SettingsPatch = Partial<
  Pick<
    AppState,
    | "childName"
    | "fontScale"
    | "tracking"
    | "showSyllables"
    | "overlay"
    | "ttsRate"
    | "reminderEnabled"
    | "reminderTime"
    | "notifyAsked"
    | "level"
    | "installHintDismissed"
  >
>;

export type AppState = {
  childName: string;
  onboarded: boolean;
  fontScale: FontScale;
  tracking: Tracking;
  showSyllables: boolean;
  overlay: Overlay;
  ttsRate: number;
  reminderEnabled: boolean;
  reminderTime: string;
  notifyAsked: boolean;
  level: Level;
  installHintDismissed: boolean;
  streak: number;
  stars: number;
  lastPracticeDate: string | null;
  dailyDone: string[];
  storyDone: string[];
  gameDone: string[];
  sessionProgress: SessionProgress | null;
  setName: (name: string) => void;
  completeOnboarding: (input: {
    name: string;
    reminderTime: string;
    reminderEnabled: boolean;
    level: Level;
  }) => void;
  setSettings: (patch: SettingsPatch) => void;
  markPractice: (kind: "daily" | "story" | "game", id?: string) => void;
  setSessionProgress: (progress: SessionProgress) => void;
  restartTodaySession: () => void;
  resetForNewChild: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      childName: "",
      onboarded: false,
      fontScale: 1.15,
      tracking: "wide",
      showSyllables: true,
      overlay: "cream",
      ttsRate: 0.85,
      reminderEnabled: true,
      reminderTime: "16:00",
      notifyAsked: false,
      level: "grade3",
      installHintDismissed: false,
      streak: 0,
      stars: 0,
      lastPracticeDate: null,
      dailyDone: [],
      storyDone: [],
      gameDone: [],
      sessionProgress: null,
      setName: (childName) => set({ childName }),
      completeOnboarding: ({ name, reminderTime, reminderEnabled, level }) =>
        set({
          childName: name.trim(),
          reminderTime,
          reminderEnabled,
          level,
          onboarded: true,
        }),
      setSettings: (patch) => set(patch),
      markPractice: (kind, id) => {
        const today = todayISO();
        const prev = get();
        let streak = prev.streak;
        if (prev.lastPracticeDate === today) {
          streak = prev.streak;
        } else if (prev.lastPracticeDate === yesterdayISO(today)) {
          streak = prev.streak + 1;
        } else {
          streak = 1;
        }
        const alreadyToday = prev.dailyDone.includes(today);
        const dailyDone = alreadyToday ? prev.dailyDone : [...prev.dailyDone, today];
        const storyDone =
          kind === "story" && id && !prev.storyDone.includes(id)
            ? [...prev.storyDone, id]
            : prev.storyDone;
        const gameDone =
          kind === "game" && id && !prev.gameDone.includes(`${today}:${id}`)
            ? [...prev.gameDone, `${today}:${id}`]
            : prev.gameDone;
        const earned = kind === "daily" ? (alreadyToday ? 0 : 3) : 1;
        set({
          lastPracticeDate: today,
          streak,
          stars: prev.stars + earned,
          dailyDone,
          storyDone,
          gameDone,
          sessionProgress:
            kind === "daily" ? { date: today, phase: "done", wordI: 0 } : prev.sessionProgress,
        });
      },
      setSessionProgress: (sessionProgress) => set({ sessionProgress }),
      restartTodaySession: () =>
        set({
          sessionProgress: { date: todayISO(), phase: "intro", wordI: 0 },
        }),
      resetForNewChild: () =>
        set({
          childName: "",
          onboarded: false,
          streak: 0,
          stars: 0,
          lastPracticeDate: null,
          dailyDone: [],
          storyDone: [],
          gameDone: [],
          sessionProgress: null,
          installHintDismissed: false,
          level: "grade3",
        }),
    }),
    {
      name: "lugemispaike-v1",
      storage: createJSONStorage(() => durableStorage()),
      skipHydration: true,
      partialize: (s) => ({
        childName: s.childName,
        onboarded: s.onboarded,
        fontScale: s.fontScale,
        tracking: s.tracking,
        showSyllables: s.showSyllables,
        overlay: s.overlay,
        ttsRate: s.ttsRate,
        reminderEnabled: s.reminderEnabled,
        reminderTime: s.reminderTime,
        notifyAsked: s.notifyAsked,
        level: s.level,
        installHintDismissed: s.installHintDismissed,
        streak: s.streak,
        stars: s.stars,
        lastPracticeDate: s.lastPracticeDate,
        dailyDone: s.dailyDone,
        storyDone: s.storyDone,
        gameDone: s.gameDone,
        sessionProgress: s.sessionProgress,
      }),
    },
  ),
);

export function useStoreHydrated() {
  const [hydrated, setHydrated] = useState(() => useAppStore.persist.hasHydrated());
  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() => setHydrated(true));
    if (useAppStore.persist.hasHydrated()) setHydrated(true);
    const t = window.setTimeout(() => setHydrated(true), 2000);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, []);
  return hydrated;
}
