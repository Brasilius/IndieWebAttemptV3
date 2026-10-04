import { weaponNames } from './weapons.ts';

export const MAX_GUESSES = 6;
export const STORAGE_KEY = 'destiny-wordle-v1';
export type Clue = 'correct' | 'present' | 'absent';
export type Stats = { played: number; won: number; streak: number; best: number };
export type Round = { answer: string; guesses: string[]; draft: string };
export type Save = { version: 1; length: number; round: Round; stats: Stats };

export function normalizeName(name: string): string {
	return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
}

export const weapons = weaponNames.map((name) => ({ name, word: normalizeName(name) }))
	.filter(({ word }) => word.length > 0 && word.length <= 8);
export const lengths = [...new Set(weapons.map(({ word }) => word.length))].sort();

export function weaponPool(length = 0) {
	return weapons.filter(({ word }) => !length || word.length === length);
}

export function chooseWeapon(length = 0, previous = '', random = Math.random): string {
	const pool = weaponPool(length);
	const candidates = pool.length > 1 ? pool.filter(({ word }) => word !== previous) : pool;
	if (!candidates.length) throw new Error('No weapons for this length');
	return candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))].word;
}

// Reserve exact matches first, then consume remaining letters once each.
export function scoreGuess(guess: string, answer: string): Clue[] {
	if (guess.length !== answer.length) throw new Error('Guess and answer lengths must match');
	const clues: Clue[] = Array(answer.length).fill('absent');
	const remaining = answer.split('');
	for (let i = 0; i < answer.length; i++) {
		if (guess[i] === answer[i]) {
			clues[i] = 'correct';
			remaining[i] = '';
		}
	}
	for (let i = 0; i < answer.length; i++) {
		if (clues[i] === 'correct') continue;
		const index = remaining.indexOf(guess[i]);
		if (index >= 0) {
			clues[i] = 'present';
			remaining[index] = '';
		}
	}
	return clues;
}

export function outcome(round: Round): 'playing' | 'won' | 'lost' {
	if (round.guesses.includes(round.answer)) return 'won';
	return round.guesses.length >= MAX_GUESSES ? 'lost' : 'playing';
}

export function recordResult(stats: Stats, won: boolean): Stats {
	const streak = won ? stats.streak + 1 : 0;
	return { played: stats.played + 1, won: stats.won + Number(won), streak, best: Math.max(stats.best, streak) };
}

export function keyboardClues(round: Round): Record<string, Clue> {
	const result: Record<string, Clue> = {};
	const rank = { absent: 0, present: 1, correct: 2 };
	for (const guess of round.guesses) {
		scoreGuess(guess, round.answer).forEach((clue, i) => {
			if (result[guess[i]] === undefined || rank[clue] > rank[result[guess[i]]]) result[guess[i]] = clue;
		});
	}
	return result;
}

// localStorage is untrusted (including old versions and interrupted writes).
export function restoreSave(raw: string | null): Save | null {
	if (!raw) return null;
	try {
		const value = JSON.parse(raw);
		if (!value || value.version !== 1 || ![0, ...lengths].includes(value.length)) return null;
		const { round, stats } = value;
		if (!round || !weaponPool(value.length).some(({ word }) => word === round.answer)) return null;
		if (!Array.isArray(round.guesses) || round.guesses.length > MAX_GUESSES) return null;
		if (!round.guesses.every((guess: unknown) => typeof guess === 'string' && /^[A-Z]+$/.test(guess) && guess.length === round.answer.length)) return null;
		if (new Set(round.guesses).size !== round.guesses.length) return null;
		const winIndex = round.guesses.indexOf(round.answer);
		if (winIndex !== -1 && winIndex !== round.guesses.length - 1) return null;
		if (typeof round.draft !== 'string' || !/^[A-Z]*$/.test(round.draft) || round.draft.length > round.answer.length) return null;
		if (!stats || !['played', 'won', 'streak', 'best'].every((key) => Number.isSafeInteger(stats[key]) && stats[key] >= 0)) return null;
		if (stats.won > stats.played || stats.streak > stats.best || stats.best > stats.won) return null;
		return { version: 1, length: value.length, round: { answer: round.answer, guesses: [...round.guesses], draft: round.draft }, stats: { played: stats.played, won: stats.won, streak: stats.streak, best: stats.best } };
	} catch {
		return null;
	}
}
