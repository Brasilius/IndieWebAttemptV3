<svelte:head>
	<title>Now — Leo</title>
	<meta name="description" content="What I'm up to right now." />
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>/now</h1>
		<p class="subtitle">
			A snapshot of what I'm doing and thinking about.
			Inspired by <a href="https://nownownow.com" rel="noopener" target="_blank">nownownow.com</a>.
		</p>
		<time class="updated" datetime="2026-04">Updated April 2026</time>
	</header>

	<div class="now-sections prose">

		<section>
			<h2>Working on</h2>
			<ul>
				<li>Building out this personal site — getting the IndieWeb stack in place</li>
				<li>Learning Svelte 5 runes in depth</li>
				<li>A small side project: a local-first note-taking tool</li>
			</ul>
		</section>

		<section>
			<h2>Reading</h2>
			<ul>
				<li>
					<strong>Project Hail Mary</strong> — Andy Weir
					<span class="note">Probably the most fun I've had reading sci-fi in years.</span>
				</li>
				<li>
					<strong>The Design of Everyday Things</strong> — Don Norman
					<span class="note">A re-read. Still full of things I missed the first time.</span>
				</li>
			</ul>
		</section>

		<section>
			<h2>Listening to</h2>
			<ul>
				<li>Khruangbin — Con Todo El Mundo</li>
				<li>Floating Points — Crush</li>
			</ul>
		</section>

		<section>
			<h2>Thinking about</h2>
			<p>
				The slow collapse of social platforms and what that means for people who've
				spent years building audiences there. The best answer I keep landing on: own your words.
				Put them somewhere you control. That's what this site is for.
			</p>
		</section>

		<section>
			<h2>Location</h2>
			<p>Home. Working from my desk, surrounded by too many keyboards.</p>
		</section>

	</div>
</div>

<style>
	.page-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}

	h1 {
		font-family: var(--font-mono);
		font-size: 2.5rem;
		letter-spacing: -0.03em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.subtitle {
		color: var(--text-muted);
		max-width: 52ch;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.updated {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-faint);
		border: 1px solid var(--border);
		padding: 0.2rem 0.6rem;
		border-radius: 99px;
		display: inline-block;
	}

	.now-sections {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.now-sections section h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-muted);
		text-transform: lowercase;
		letter-spacing: 0.03em;
		margin-bottom: 0.75rem;
		font-family: var(--font-mono);
	}

	.now-sections ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.now-sections li {
		padding-left: 1rem;
		border-left: 2px solid var(--border);
		color: var(--text);
		font-size: 0.95rem;
		transition: border-color var(--t);
	}

	.now-sections li:hover {
		border-left-color: var(--accent-dim);
	}

	.note {
		display: block;
		font-size: 0.82rem;
		color: var(--text-muted);
		margin-top: 0.15rem;
		font-style: italic;
	}
</style>
