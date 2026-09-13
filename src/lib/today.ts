import {
  CHOICE_QUIZ,
  LISTEN_QUIZ,
  MISSING_QUIZ,
  SAME_QUIZ,
  STORIES,
  SYLLABLE_WORDS,
  type QuizItem,
  type Story,
  type SyllableWord,
} from "./content";
import type { Level } from "./store";
import { hashString, pickN, yesterdayISO } from "./utils";

export type DailySession = {
  date: string;
  words: SyllableWord[];
  story: Story;
  quizzes: QuizItem[];
};

const EASY_STORY_COUNT = 10;

function storyPoolForLevel(level: Level): Story[] {
  if (level === "easy") {
    return STORIES.slice(0, Math.min(EASY_STORY_COUNT, STORIES.length));
  }
  return STORIES;
}

/** Pick story index for date; never equal to yesterday's final index when pool > 1. */
function storyIndexForDate(date: string, level: Level, poolLen: number): number {
  if (poolLen <= 0) return 0;
  if (poolLen === 1) return 0;
  // Walk a short chain so each day's final accounts for the prior day's final.
  const window = Math.min(poolLen + 2, 16);
  const dates: string[] = [];
  let d = date;
  for (let i = 0; i < window; i++) {
    dates.push(d);
    d = yesterdayISO(d);
  }
  dates.reverse();
  let prev = -1;
  let idx = 0;
  for (const day of dates) {
    idx = hashString(`${day}:${level}`) % poolLen;
    if (prev >= 0 && idx === prev) {
      idx = (idx + 1) % poolLen;
    }
    prev = idx;
  }
  return idx;
}

function storyForDate(date: string, level: Level): Story {
  const pool = storyPoolForLevel(level);
  const idx = storyIndexForDate(date, level, pool.length);
  return pool[idx]!;
}

function pickFresh<T extends { id: string }>(
  arr: readonly T[],
  seed: number,
  n: number,
  salt: number,
  excludeIds: ReadonlySet<string>,
): T[] {
  if (excludeIds.size === 0) return pickN(arr, seed, n, salt);
  const filtered = arr.filter((item) => !excludeIds.has(item.id));
  return pickN(filtered.length >= n ? filtered : arr, seed, n, salt);
}

function wordsForLevel(
  level: Level,
  seed: number,
  excludeIds: ReadonlySet<string> = new Set(),
): SyllableWord[] {
  if (level === "easy") {
    const short = SYLLABLE_WORDS.filter((w) => w.syllables.length <= 2);
    return pickFresh(short.length >= 4 ? short : SYLLABLE_WORDS, seed, 4, 11, excludeIds);
  }
  if (level === "stretch") {
    const long = SYLLABLE_WORDS.filter((w) => w.syllables.length >= 3);
    return pickFresh(long.length >= 6 ? long : SYLLABLE_WORDS, seed, 6, 11, excludeIds);
  }
  return pickFresh(SYLLABLE_WORDS, seed, 5, 11, excludeIds);
}

function quizzesForSession(
  level: Level,
  seed: number,
  excludeIds: ReadonlySet<string>,
): QuizItem[] {
  const quizN = 1;
  const extra = level === "stretch" ? 1 : 0;
  return [
    ...pickFresh(CHOICE_QUIZ, seed, quizN + extra, 3, excludeIds),
    ...pickFresh(MISSING_QUIZ, seed, quizN, 7, excludeIds),
    ...pickFresh(SAME_QUIZ, seed, quizN, 13, excludeIds),
    ...pickFresh(LISTEN_QUIZ, seed, quizN, 19, excludeIds),
  ];
}

export function sessionForDate(date: string, level: Level = "grade3"): DailySession {
  const seed = hashString(`${date}:${level}`);
  const yDate = yesterdayISO(date);
  const ySeed = hashString(`${yDate}:${level}`);

  // Yesterday's picks (without excluding day-before) — used only to reduce overlap.
  const yWords = wordsForLevel(level, ySeed);
  const yQuizzes = quizzesForSession(level, ySeed, new Set());
  const excludeIds = new Set<string>([
    ...yWords.map((w) => w.id),
    ...yQuizzes.map((q) => q.id),
  ]);

  const words = wordsForLevel(level, seed, excludeIds);
  const story = storyForDate(date, level);
  const quizzes = quizzesForSession(level, seed, excludeIds);
  return { date, words, story, quizzes };
}

export function syllableWordsForDate(date: string, level: Level = "grade3"): SyllableWord[] {
  const seed = hashString(`${date}:silbid:${level}`);
  const ySeed = hashString(`${yesterdayISO(date)}:silbid:${level}`);
  let yWords: SyllableWord[];
  if (level === "easy") {
    const short = SYLLABLE_WORDS.filter((w) => w.syllables.length <= 2);
    yWords = pickN(short.length >= 6 ? short : SYLLABLE_WORDS, ySeed, 6, 21);
  } else if (level === "stretch") {
    const long = SYLLABLE_WORDS.filter((w) => w.syllables.length >= 3);
    yWords = pickN(long.length >= 8 ? long : SYLLABLE_WORDS, ySeed, 8, 21);
  } else {
    yWords = pickN(SYLLABLE_WORDS, ySeed, 8, 21);
  }
  const excludeIds = new Set(yWords.map((w) => w.id));

  if (level === "easy") {
    const short = SYLLABLE_WORDS.filter((w) => w.syllables.length <= 2);
    return pickFresh(short.length >= 6 ? short : SYLLABLE_WORDS, seed, 6, 21, excludeIds);
  }
  if (level === "stretch") {
    const long = SYLLABLE_WORDS.filter((w) => w.syllables.length >= 3);
    return pickFresh(long.length >= 8 ? long : SYLLABLE_WORDS, seed, 8, 21, excludeIds);
  }
  return pickFresh(SYLLABLE_WORDS, seed, 8, 21, excludeIds);
}

export type GameKind = "choice" | "missing" | "same" | "listen";

export const GAME_META: Record<
  GameKind,
  { title: string; blurb: string }
> = {
  choice: { title: "Milline on õige?", blurb: "Vali õigesti kirjutatud sõna." },
  missing: { title: "Puuduv täht", blurb: "Milline täht sõnast puudu on?" },
  same: { title: "Sama või erinev", blurb: "Kas need kaks sõna on ühesugused?" },
  listen: { title: "Kuula ja vali", blurb: "Kuula sõna ja leia see nimekirjast." },
};

export function quizzesForGame(kind: GameKind, date: string, level: Level = "grade3"): QuizItem[] {
  const seed = hashString(`${date}:${kind}:${level}`);
  const ySeed = hashString(`${yesterdayISO(date)}:${kind}:${level}`);
  const n = level === "easy" ? 4 : level === "stretch" ? 8 : 6;

  const pool =
    kind === "choice"
      ? CHOICE_QUIZ
      : kind === "missing"
        ? MISSING_QUIZ
        : kind === "same"
          ? SAME_QUIZ
          : LISTEN_QUIZ;
  const yN = kind === "listen" ? Math.min(n, LISTEN_QUIZ.length) : n;
  const yPick = pickN(pool, ySeed, yN, kind === "choice" ? 2 : kind === "missing" ? 4 : kind === "same" ? 6 : 8);
  const excludeIds = new Set(yPick.map((q) => q.id));
  const salt = kind === "choice" ? 2 : kind === "missing" ? 4 : kind === "same" ? 6 : 8;
  const count = kind === "listen" ? Math.min(n, LISTEN_QUIZ.length) : n;
  return pickFresh(pool, seed, count, salt, excludeIds);
}

export const LEVEL_META: Record<Level, { title: string; blurb: string }> = {
  easy: { title: "Rahulik", blurb: "Lühemad sõnad, 2. klass" },
  grade3: { title: "3. klass", blurb: "Tavaline tase" },
  stretch: { title: "Natuke rohkem", blurb: "Pikemad sõnad" },
};
