<script lang="ts">
	import { onMount } from 'svelte';
	import XurSprite from '$lib/components/XurSprite.svelte';
	import { MAX_GUESSES, STORAGE_KEY, chooseWeapon, keyboardClues, lengths, outcome, recordResult, restoreSave, scoreGuess, weaponPool, weapons, type Clue, type Round, type Save, type Stats } from '$lib/games/destiny-wordle';

	let ready = $state(false);
	let length = $state(0);
	let nextLength = $state(0);
	let round = $state<Round>({ answer: '', guesses: [], draft: '' });
	let stats = $state<Stats>({ played: 0, won: 0, streak: 0, best: 0 });
	let message = $state('');
	let storageNotice = $state('');
	let paused = $state(false);
	let gamePanel: HTMLElement;
	const keyboard = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
	const symbols: Record<Clue, string> = { correct: '✓', present: '•', absent: '×' };
	const descriptions: Record<Clue, string> = { correct: 'right spot', present: 'different spot', absent: 'not in weapon' };
	let gameOutcome = $derived(outcome(round));
	let keys = $derived(keyboardClues(round));
	let answerName = $derived(weapons.find(({ word }) => word === round.answer)?.name ?? '');
	let xurMessage = $derived(gameOutcome === 'won' ? 'A fine discovery, Guardian.' : gameOutcome === 'lost' ? 'Another mystery awaits you.' : round.guesses.length >= 4 ? 'Look closely at what you already know.' : 'A weapon is hidden here. Can you name it?');

	onMount(() => {
		try {
			const saved = restoreSave(localStorage.getItem(STORAGE_KEY));
			if (saved) {
				length = nextLength = saved.length;
				round = saved.round;
				stats = saved.stats;
			} else round = { answer: chooseWeapon(), guesses: [], draft: '' };
		} catch {
			round = { answer: chooseWeapon(), guesses: [], draft: '' };
			storageNotice = 'Browser saving is unavailable. You can still play this visit.';
		}
		ready = true;
		save();
	});

	function save() {
		if (!ready) return;
		try {
			const value: Save = { version: 1, length, round, stats };
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		} catch {
			storageNotice = 'Browser saving is unavailable. You can still play this visit.';
		}
	}

	function newRound() {
		if (gameOutcome === 'playing' && round.guesses.length) stats = recordResult(stats, false);
		length = nextLength;
		round = { answer: chooseWeapon(length, round.answer), guesses: [], draft: '' };
		message = 'New weapon ready. Good luck, Guardian.';
		save();
		gamePanel?.focus({ preventScroll: true });
	}

	function press(key: string) {
		if (!ready || gameOutcome !== 'playing') return;
		if (key === 'ENTER') {
			if (round.draft.length !== round.answer.length) {
				message = `Enter ${round.answer.length} letters before guessing.`;
				return;
			}
			if (round.guesses.includes(round.draft)) {
				message = 'You already tried that guess.';
				return;
			}
			const guess = round.draft;
			round = { ...round, guesses: [...round.guesses, guess], draft: '' };
			const result = outcome(round);
			if (result !== 'playing') stats = recordResult(stats, result === 'won');
			message = result === 'won' ? `You found ${answerName} in ${round.guesses.length} ${round.guesses.length === 1 ? 'guess' : 'guesses'}!` : result === 'lost' ? `The weapon was ${answerName}. Try another round!` : `${guess}: ${scoreGuess(guess, round.answer).map((clue, index) => `${guess[index]} ${descriptions[clue]}`).join(', ')}.`;
		} else if (key === 'BACKSPACE') {
			round.draft = round.draft.slice(0, -1);
			message = '';
		} else if (/^[A-Z]$/.test(key) && round.draft.length < round.answer.length) {
			round.draft += key;
			message = '';
		}
		save();
	}

	function handleKey(event: KeyboardEvent) {
		if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing || !ready) return;
		const target = event.target;
		if (target instanceof HTMLElement) {
			if (target.closest('input, textarea, select, a, [contenteditable="true"]')) return;
			if (target.closest('button') && !target.closest('.keyboard')) return;
			if (target.closest('button') && (event.key === 'Enter' || event.key === ' ')) return;
		}
		const key = event.key.toUpperCase();
		if (/^[A-Z]$/.test(key) || key === 'ENTER' || key === 'BACKSPACE') {
			event.preventDefault();
			press(key);
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<svelte:head>
	<title>Weapon Wordle · games · Leo</title>
	<meta name="description" content="Guess a Destiny weapon in six tries. Choose your word length, play unlimited rounds, and meet pixel Xûr." />
	<meta property="og:title" content="Weapon Wordle · Leo" />
	<meta property="og:description" content="A little Destiny guessing game with a very mysterious merchant." />
	<meta property="og:url" content="https://nielslarsen.dev/games" />
</svelte:head>

<div class="container arcade">
	<header class="page-header">
		<p class="eyebrow">SIDE QUEST / 001</p>
		<h1>Weapon Wordle</h1>
		<p>Six guesses. One Destiny weapon. A little help from the Nine.</p>
	</header>

	<div class="encounter">
		<aside class="merchant" aria-label="Xûr, your game companion">
			<div class="merchant-label"><span aria-hidden="true">◆</span> AGENT OF THE NINE</div>
			<div class="sprite-scene"><XurSprite {paused} /></div>
			<h2>Xûr</h2>
			<p class="merchant-title">the mysterious merchant</p>
			<p class="speech">{xurMessage}</p>
			<button class="motion-toggle" onclick={() => paused = !paused} aria-pressed={paused}>{paused ? 'Resume' : 'Pause'} animation</button>
		</aside>

		<section class="game pixel-card" aria-label="Weapon guessing game" tabindex="-1" bind:this={gamePanel}>
			<div class="card-label"><span class="pixel-mark" aria-hidden="true"></span> THE HIDDEN ARSENAL <span>UNLIMITED PLAY</span></div>
			<div class="game-content">
				<div class="round-controls">
					<label for="weapon-length">Next weapon
						<select id="weapon-length" bind:value={nextLength} disabled={!ready}>
							<option value={0}>Any length</option>
							{#each lengths as size}<option value={size}>{size} letters</option>{/each}
						</select>
					</label>
					<button class="new-round" onclick={newRound} disabled={!ready}>{gameOutcome === 'playing' && round.guesses.length ? 'Give up & new weapon' : 'New weapon'} <span aria-hidden="true">↗</span></button>
				</div>
				<p class="round-info">{ready ? `${round.answer.length} letters · ${round.guesses.length} / ${MAX_GUESSES} guesses` : 'Opening the arsenal…'}</p>

				{#if ready}
					<div class="board" style={`--letters: ${round.answer.length}`} aria-label={`${round.answer.length}-letter weapon, six guess rows`}>
						{#each Array(MAX_GUESSES) as _, rowIndex}
							{@const guess = round.guesses[rowIndex]}
							{@const active = rowIndex === round.guesses.length && gameOutcome === 'playing'}
							{@const word = guess ?? (active ? round.draft : '')}
							{@const clues = guess ? scoreGuess(guess, round.answer) : []}
							<div class="board-row" role="group" aria-label={`Guess ${rowIndex + 1}${active ? ', current' : ''}`}>
								{#each Array(round.answer.length) as _, index}
									<div class={`tile ${clues[index] ?? ''}`} class:filled={!guess && !!word[index]} class:current={active} aria-label={word[index] ? `${word[index]}${clues[index] ? `, ${descriptions[clues[index]]}` : ''}` : 'empty'}>
										<span aria-hidden="true">{word[index] ?? ''}</span>
										{#if clues[index]}<small aria-hidden="true">{symbols[clues[index]]}</small>{/if}
									</div>
								{/each}
							</div>
						{/each}
					</div>
				{/if}

				<div class="status" aria-live="polite" aria-atomic="true">
					{#if gameOutcome === 'won'}<p class="result">LOOT FOUND: {answerName}</p>
					{:else if gameOutcome === 'lost'}<p class="result">THE WEAPON WAS: {answerName}</p>{/if}
					<p>{message || (gameOutcome === 'playing' ? 'Type or tap the letters below.' : 'Choose a new weapon to play again.')}</p>
				</div>

				<div class="keyboard" aria-label="On-screen keyboard">
					{#each keyboard as row, index}
						<div class="key-row">
							{#if index === 2}<button class="wide-key" onclick={() => press('ENTER')} disabled={!ready || gameOutcome !== 'playing'} aria-label="Submit guess">ENTER</button>{/if}
							{#each [...row] as key}<button class={keys[key] ?? ''} onclick={() => press(key)} disabled={!ready || gameOutcome !== 'playing'} aria-label={`${key}${keys[key] ? `, ${descriptions[keys[key]]}` : ''}`}>{key}</button>{/each}
							{#if index === 2}<button class="wide-key" onclick={() => press('BACKSPACE')} disabled={!ready || gameOutcome !== 'playing'} aria-label="Delete last letter">DEL</button>{/if}
						</div>
					{/each}
				</div>

				<div class="legend" aria-label="Letter clue meanings"><span><i class="correct">✓</i> right spot</span><span><i class="present">•</i> wrong spot</span><span><i class="absent">×</i> absent</span></div>
				<dl class="stats" aria-label="Your game statistics">
					<div><dt>played</dt><dd>{stats.played}</dd></div><div><dt>won</dt><dd>{stats.won}</dd></div><div><dt>streak</dt><dd>{stats.streak}</dd></div><div><dt>best</dt><dd>{stats.best}</dd></div>
				</dl>
			</div>
		</section>
	</div>

	<details class="how-to">
		<summary>How to play & weapon list</summary>
		<p>Find a Destiny 2 weapon in six tries. Every answer has at most eight letters. Leave out spaces and punctuation, and type JOTUNN for Jötunn. Guesses can be any letters of the right length; you don’t have to guess a weapon from the list.</p>
		<p>Green ✓ means the right letter in the right spot. Gold • means the letter belongs elsewhere. Gray × means there are no remaining copies of that letter. Your next-length selection takes effect when you choose a new weapon. Giving up after a guess counts as a loss and ends your streak.</p>
		<p>Want a reference? These {weaponPool(nextLength).length} weapons are in the selected pool:</p>
		<p class="weapon-list">{weaponPool(nextLength).map(({ name }) => name).join(' · ')}</p>
		<p class="source-note">A curated local arsenal, with names from Destiny 2. References: <a href="https://www.bungie.net/7/en/News/Article/destiny_2_update_8_0_0_1" target="_blank" rel="noreferrer">Bungie weapon notes</a> and <a href="https://www.bungie.net/7/en-us/News/Article/destiny_update_9_7_0" target="_blank" rel="noreferrer">Bungie update notes</a>.</p>
	</details>
	<p class="local-note">{storageNotice || 'Your round and stats stay in this browser. Play as many rounds as you like.'}</p>
	<p class="credit">Unofficial fan minigame. Destiny and Xûr belong to Bungie.</p>
</div>

<style>
	.arcade { max-width: 1080px; }
	.page-header { padding-bottom: 1.5rem; margin-bottom: 2.5rem; }
	.eyebrow { color: var(--accent); font-size: 0.7rem; letter-spacing: 0.12em; margin-bottom: 0.7rem; }
	h1 { font-size: clamp(1.7rem, 4vw, 2.5rem); margin-bottom: 0.65rem; }
	.page-header > p:last-child { color: var(--text-muted); font-size: 0.85rem; }
	.encounter { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 2rem; align-items: center; }
	.merchant { text-align: center; }
	.merchant-label { font-size: 0.6rem; color: var(--warm); letter-spacing: 0.08em; }
	.merchant-label span { color: var(--accent); }
	.sprite-scene { display: flex; justify-content: center; margin: 1.2rem auto 0.5rem; background: radial-gradient(ellipse at 50% 80%, var(--accent-glow), transparent 65%); }
	.merchant h2 { font-size: 1.3rem; }
	.merchant-title { font-size: 0.6rem; color: var(--text-muted); margin-bottom: 1rem; }
	.speech { position: relative; border: 1px solid var(--border); padding: 1rem; background: var(--surface); font-size: 0.75rem; min-height: 86px; }
	.speech::before { content: ''; position: absolute; top: -6px; left: calc(50% - 5px); width: 10px; height: 10px; border-top: 1px solid var(--border); border-left: 1px solid var(--border); background: var(--surface); transform: rotate(45deg); }
	button { cursor: pointer; border: 1px solid var(--border); color: var(--text); background: var(--surface-2); }
	button:hover:not(:disabled) { border-color: var(--accent); }
	button:disabled { cursor: default; }
	.motion-toggle { background: transparent; border: none; font-size: 0.6rem; color: var(--text-muted); padding: 0.7rem; min-height: 44px; }
	.game { min-width: 0; }
	.card-label { flex-wrap: wrap; font-size: 0.6rem; gap: 0.5rem; }
	.game-content { padding: clamp(0.75rem, 2.5vw, 1.5rem); }
	.round-controls { display: flex; justify-content: space-between; gap: 1rem; align-items: end; }
	label { font-size: 0.65rem; color: var(--text-muted); }
	select { display: block; background: var(--surface-2); color: var(--text); border: 1px solid var(--border); padding: 0.55rem; font-size: 0.75rem; min-height: 44px; border-radius: 0; margin-top: 0.3rem; max-width: 100%; }
	.new-round { padding: 0.6rem 0.8rem; min-height: 44px; font-size: 0.7rem; color: var(--accent); }
	.round-info { text-align: center; color: var(--text-muted); font-size: 0.7rem; margin: 1.3rem 0 0.8rem; }
	.board { max-width: calc(var(--letters) * 54px); margin-inline: auto; display: grid; gap: 5px; }
	.board-row { display: grid; grid-template-columns: repeat(var(--letters), minmax(0, 1fr)); gap: 5px; }
	.tile { position: relative; aspect-ratio: 1; border: 2px solid var(--border); display: grid; place-items: center; font-size: clamp(1rem, 2.5vw, 1.45rem); line-height: 1; }
	.tile.current { border-color: var(--text-faint); }
	.tile.filled { border-color: var(--warm); }
	.tile small { position: absolute; right: 2px; bottom: 1px; font-size: 0.55rem; }
	.tile.correct, .tile.present, .tile.absent { border-color: transparent; }
	.correct { background: #476b32; color: #fff9ed; }
	.present { background: #866323; color: #fff9ed; }
	.absent { background: #393b40; color: #fff9ed; }
	.status { min-height: 66px; display: flex; flex-direction: column; justify-content: center; text-align: center; font-size: 0.65rem; color: var(--text-muted); overflow-wrap: anywhere; padding: 0.7rem 0; }
	.result { color: var(--accent); font-size: 0.8rem; margin-bottom: 0.3rem; }
	.keyboard { display: grid; gap: 6px; }
	.key-row { display: flex; justify-content: center; gap: 5px; }
	.key-row:nth-child(2) { padding-inline: 4%; }
	.key-row button { flex: 1; min-width: 0; min-height: 44px; padding: 0; font-size: 0.8rem; }
	.key-row .wide-key { flex: 1.7; font-size: 0.55rem; }
	.legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1rem; font-size: 0.6rem; color: var(--text-muted); }
	.legend span { display: flex; align-items: center; gap: 0.3rem; }
	.legend i { display: inline-grid; place-items: center; width: 17px; height: 17px; font-style: normal; }
	.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1.3rem; text-align: center; }
	dt { font-size: 0.6rem; color: var(--text-muted); }
	dd { font-size: 1.2rem; color: var(--accent); }
	.how-to { margin-top: 2rem; border: 1px solid var(--border); padding: 1rem; font-size: 0.75rem; }
	summary { cursor: pointer; color: var(--accent); min-height: 24px; }
	.how-to p { margin-top: 1rem; color: var(--text-muted); }
	.how-to .weapon-list { color: var(--text); }
	.source-note { font-size: 0.65rem; }
	.local-note { margin-top: 1.25rem; color: var(--text-muted); font-size: 0.65rem; }
	.credit { margin-top: 0.5rem; color: var(--text-muted); font-size: 0.6rem; }
	@media (max-width: 760px) {
		.encounter { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
		.game { grid-row: 1; }
		.merchant { grid-row: 2; width: min(100%, 300px); justify-self: center; }
		.page-header { margin-bottom: 1.8rem; }
	}
	@media (max-width: 380px) {
		.arcade { padding-inline: 1rem; }
		.round-controls { gap: 0.5rem; }
		.new-round { max-width: 140px; padding-inline: 0.5rem; }
		.board, .board-row { gap: 3px; }
		.tile { border-width: 1px; }
		.key-row { gap: 3px; }
		.key-row button { font-size: 0.7rem; }
		.key-row .wide-key { font-size: 0.48rem; }
	}
</style>
