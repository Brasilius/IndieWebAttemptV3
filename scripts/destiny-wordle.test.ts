import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MAX_GUESSES, chooseWeapon, keyboardClues, lengths, normalizeName, outcome, recordResult, restoreSave, scoreGuess, weaponPool, weapons } from '../src/lib/games/destiny-wordle.ts';

test('local arsenal contains unique words with at most eight letters', () => {
	assert.equal(weapons.length, 45);
	assert.equal(new Set(weapons.map(({ word }) => word)).size, weapons.length);
	assert.ok(weapons.every(({ word }) => /^[A-Z]{1,8}$/.test(word)));
	assert.deepEqual(lengths, [4, 5, 6, 7, 8]);
	assert.equal(normalizeName('Jötunn'), 'JOTUNN');
	assert.equal(normalizeName('D.A.R.C.I.'), 'DARCI');
	assert.equal(normalizeName('Rat King'), 'RATKING');
});

test('new rounds honor each length and avoid immediately repeating the weapon', () => {
	for (const length of lengths) {
		const first = chooseWeapon(length, '', () => 0);
		const second = chooseWeapon(length, first, () => 0);
		assert.equal(first.length, length);
		assert.equal(second.length, length);
		assert.notEqual(first, second);
		assert.ok(weaponPool(length).some(({ word }) => word === second));
	}
});

test('duplicate guesses cannot claim a letter reserved for an exact match', () => {
	assert.deepEqual(scoreGuess('RRRRR', 'THORN'), ['absent', 'absent', 'absent', 'correct', 'absent']);
	assert.deepEqual(scoreGuess('NNNNNN', 'JOTUNN'), ['absent', 'absent', 'absent', 'absent', 'correct', 'correct']);
});

test('misplaced repeated letters consume only the available copies', () => {
	assert.deepEqual(scoreGuess('NNAAAA', 'JOTUNN'), ['present', 'present', 'absent', 'absent', 'absent', 'absent']);
	assert.deepEqual(scoreGuess('TTTTT', 'TRUST'), ['correct', 'absent', 'absent', 'absent', 'correct']);
	assert.throws(() => scoreGuess('ROSE', 'THORN'));
});

test('keyboard retains the strongest clue across all appearances', () => {
	assert.equal(keyboardClues({ answer: 'THORN', guesses: ['RRRRR', 'ROSES'], draft: '' }).R, 'correct');
});

test('sixth guess can win, otherwise the round ends after six guesses', () => {
	const guesses = ['AAAAA', 'BBBBB', 'CCCCC', 'DDDDD', 'EEEEE'];
	assert.equal(outcome({ answer: 'THORN', guesses, draft: '' }), 'playing');
	assert.equal(outcome({ answer: 'THORN', guesses: [...guesses, 'THORN'], draft: '' }), 'won');
	assert.equal(outcome({ answer: 'THORN', guesses: [...guesses, 'FFFFF'], draft: '' }), 'lost');
	assert.equal(MAX_GUESSES, 6);
});

test('wins extend a streak; losses reset it and preserve the best', () => {
	let stats = recordResult({ played: 0, won: 0, streak: 0, best: 0 }, true);
	stats = recordResult(stats, true);
	stats = recordResult(stats, false);
	assert.deepEqual(stats, { played: 3, won: 2, streak: 0, best: 2 });
});

const saved = { version: 1, length: 5, round: { answer: 'THORN', guesses: ['TRUST'], draft: 'TH' }, stats: { played: 3, won: 2, streak: 0, best: 2 } };

test('valid progress and completed rounds survive refresh', () => {
	assert.deepEqual(restoreSave(JSON.stringify(saved)), saved);
	const won = { ...saved, round: { ...saved.round, guesses: ['TRUST', 'THORN'], draft: '' } };
	assert.deepEqual(restoreSave(JSON.stringify(won)), won);
});

test('malformed, stale, and inconsistent saves fall back safely', () => {
	for (const raw of [null, '{', 'null', '{}', JSON.stringify({ ...saved, version: 2 }), JSON.stringify({ ...saved, length: 8 }), JSON.stringify({ ...saved, stats: { ...saved.stats, won: 10 } }), JSON.stringify({ ...saved, round: { ...saved.round, answer: 'FAKE' } }), JSON.stringify({ ...saved, round: { ...saved.round, guesses: ['THORN', 'TRUST'] } }), JSON.stringify({ ...saved, round: { ...saved.round, draft: '<img>' } }), JSON.stringify({ ...saved, round: { ...saved.round, guesses: ['TRUST', 'TRUST'] } })]) {
		assert.equal(restoreSave(raw), null);
	}
});
