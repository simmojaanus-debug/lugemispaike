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
import { hashString, pickN } from "./utils";

export type DailySession = {
  date: string;
  words: SyllableWord[];
  story: Story;
  quizzes: QuizItem[];
};

function wordsForLevel(level: Level, seed: number): SyllableWord[] {
  if (level === "easy") {
    const short = SYLLABLE_WORDS.filter((w) => w.syllables.length <= 2);
    return pickN(short.length >= 4 ? short : SYLLABLE_WORDS, seed, 4, 11);
  }
  if (level === "stretch") {
    const long = SYLLABLE_WORDS.filter((w) => w.syllables.length >= 3);
    return pickN(long.length >= 6 ? long : SYLLABLE_WORDS, seed, 6, 11);
  }
  return pickN(SYLLABLE_WORDS, seed, 5, 11);
}

export function sessionForDate(date: string, level: Level = "grade3"): DailySession {
  const seed = hashString(`${date}:${level}`);
  const words = wordsForLevel(level, seed);
  const storyPool =
    level === "easy" ? STORIES.slice(0, 8) : STORIES;
  const story = storyPool[seed % storyPool.length]!;
  const quizN = level === "easy" ? 1 : 1;
  const extra = level === "stretch" ? 1 : 0;
  const quizzes = [
    ...pickN(CHOICE_QUIZ, seed, quizN + extra, 3),
    ...pickN(MISSING_QUIZ, seed, quizN, 7),
    ...pickN(SAME_QUIZ, seed, quizN, 13),
    ...pickN(LISTEN_QUIZ, seed, quizN, 19),
  ];
  return { date, words, story, quizzes };
}

export function syllableWordsForDate(date: string, level: Level = "grade3"): SyllableWord[] {
  const seed = hashString(`${date}:silbid:${level}`);
  if (level === "easy") {
    const short = SYLLABLE_WORDS.filter((w) => w.syllables.length <= 2);
    return pickN(short.length >= 6 ? short : SYLLABLE_WORDS, seed, 6, 21);
  }
  if (level === "stretch") {
    const long = SYLLABLE_WORDS.filter((w) => w.syllables.length >= 3);
    return pickN(long.length >= 8 ? long : SYLLABLE_WORDS, seed, 8, 21);
  }
  return pickN(SYLLABLE_WORDS, seed, 8, 21);
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
  const n = level === "easy" ? 4 : level === "stretch" ? 8 : 6;
  if (kind === "choice") return pickN(CHOICE_QUIZ, seed, n, 2);
  if (kind === "missing") return pickN(MISSING_QUIZ, seed, n, 4);
  if (kind === "same") return pickN(SAME_QUIZ, seed, n, 6);
  return pickN(LISTEN_QUIZ, seed, Math.min(n, LISTEN_QUIZ.length), 8);
}

export const LEVEL_META: Record<Level, { title: string; blurb: string }> = {
  easy: { title: "Rahulik", blurb: "Lühemad sõnad, 2. klass" },
  grade3: { title: "3. klass", blurb: "Tavaline tase" },
  stretch: { title: "Natuke rohkem", blurb: "Pikemad sõnad" },
};
