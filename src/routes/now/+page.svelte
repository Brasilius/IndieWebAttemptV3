<svelte:head>
	<title>Now - Leo</title>
	<meta name="description" content="What I'm up to right now." />
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>/now</h1>
		<p class="subtitle">
			A snapshot of what I'm doing and thinking about.
			Inspired by <a href="https://nownownow.com" rel="noopener" target="_blank">nownownow.com</a>.
		</p>
		<time class="updated" datetime="2026-09">Updated September 2026</time>
	</header>

	<div class="now-sections prose">

		<section>
			<h2>Working on</h2>
			<ul>
				<li>Automating production workflows using robotics and AI.</li>
				<li>Figuring out un-ending radio issues.</li>
				<li>Becoming the Jira and Confluence final boss.</li>
			</ul>
		</section>

		<section>
			<h2>Reading</h2>
			<ul>
				<li>
					<strong>The Fourth Wing</strong> - Rebeecca Yarros
					<span class="note">I had a really good friend recommend this to me!</span>
				</li>
				<li>
					<strong>Project Hail Mary</strong> - Andy Weir
					<span class="note">On a different note, Dr.Grace is still fighing for his life in my head cannon.</span>
				</li>
			</ul>
		</section>

		<section>
			<h2>Listening to</h2>
			<ul>
				<li>Hiring Eddie - Paul Leonard-Morgan</li>
				<li>The Peace - The Underscores</li>
			</ul>
		</section>

		<section>
			<h2>Thinking about</h2>
			<p>
			How do you overoptimize a job?
			</p>
		</section>

		<section>
			<h2>Location</h2>
			<p>In the Gundo, integrating and testing new tech! </p>
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
