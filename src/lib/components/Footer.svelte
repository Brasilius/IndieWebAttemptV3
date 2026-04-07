<script lang="ts">
	const year = new Date().getFullYear();

	const socials = [
		{ href: 'https://github.com/brasilius',    label: 'github',   rel: 'me noopener noreferrer' },
		{ href: 'https://www.instagram.com/niels_leo_larsen/',       label: 'instagram', rel: 'me noopener noreferrer' },
	];
</script>

<footer>
	<div class="container">
		<!-- IndieWeb h-card (hidden, for parsers) -->
		<div class="h-card" hidden>
			<a class="u-url u-uid" href="https://nielslarsen.dev" rel="me">nielslarsen.dev</a>
			<span class="p-name">Leo</span>
			<span class="p-note">A personal site on the IndieWeb.</span>
		</div>

		<div class="inner">
			<div class="left">
				<span class="copy">&copy; {year} Leo</span>
				<span class="sep" aria-hidden="true">/</span>
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener" target="_blank">Yipee!</a>
			</div>

			<nav class="socials" aria-label="Social links">
				{#each socials as s}
					<a href={s.href} rel={s.rel} target="_blank">{s.label}</a>
				{/each}
			</nav>
		</div>

		<div class="badges">
			<a class="badge" href="https://indieweb.org" rel="noopener" target="_blank">IndieWeb</a>
			<a class="badge" href="https://microformats.org" rel="noopener" target="_blank">microformats</a>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--border);
		padding-block: 2rem 2.5rem;
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.sep { color: var(--text-faint); }

	.left a {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		transition: color var(--t);
	}
	.left a:hover { color: var(--accent); }

	.socials {
		display: flex;
		gap: 0.6rem;
	}

	.socials a {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		transition: color var(--t);
	}
	.socials a:hover { color: var(--accent); }

	.badges {
		display: flex;
		gap: 0.4rem;
	}

	.badge {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: var(--text-faint);
		border: 1px solid var(--border);
		padding: 0.15rem 0.55rem;
		border-radius: 4px;
		transition: color var(--t), border-color var(--t);
	}
	.badge:hover {
		color: var(--accent);
		border-color: var(--accent-ring);
	}
</style>
