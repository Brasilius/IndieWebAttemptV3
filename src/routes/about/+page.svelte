<script lang="ts">
	import pfpbanner from '$lib/assets/pfpbanner1.jpg';

	const links = [
		{ href: 'https://github.com/yourusername',    label: '/github',   rel: 'me noopener noreferrer' },
		{ href: 'https://mastodon.social/@you',       label: '/mastodon', rel: 'me noopener noreferrer' },
		{ href: 'mailto:you@yoursite.com',            label: '/email',    rel: '' },
	];
</script>

<svelte:head>
	<title>About — Leo</title>
	<meta name="description" content="A bit about me." />
</svelte:head>

<div class="container">
	<div class="layout">

		<!-- IndieWeb h-card -->
		<aside class="sidebar">
			<div class="avatar-wrap h-card">
				<img class="avatar u-photo" src={pfpbanner} alt="Leo" />
				<p class="p-name name">Leo</p>
				<p class="p-note tagline">making things for the web</p>
				<a class="u-url u-uid" href="https://yoursite.com" rel="me" hidden>yoursite.com</a>

				<ul class="social-links" role="list">
					{#each links as link}
						<li>
							<a href={link.href} rel={link.rel} target={link.href.startsWith('http') ? '_blank' : undefined}>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</aside>

		<!-- Bio -->
		<div class="bio">
			<h1>About</h1>

			<div class="prose">
				<p>
					Hi — I'm Leo. I build things for the web, mostly in TypeScript and Svelte.
					I believe in an internet made of personal pages, RSS feeds, and hyperlinks that last.
				</p>

				<p>
					This site is my digital home. I use it to write about building software, tools
					I find interesting, and whatever else is on my mind. Everything here is written
					by me and owned by me — no tracking, no ads, no algorithmic timeline.
				</p>

				<h2>What I'm into</h2>
				<ul>
					<li>Building small, focused software tools</li>
					<li>The IndieWeb and personal web publishing</li>
					<li>Mechanical keyboards and analog writing</li>
					<li>Science fiction — especially hard sci-fi</li>
				</ul>

				<h2>This site</h2>
				<p>
					Built with <a href="https://kit.svelte.dev" rel="noopener" target="_blank">SvelteKit</a> and
					<a href="https://mdsvex.pngwn.io" rel="noopener" target="_blank">mdsvex</a>.
					Styled with custom CSS and a palette of earthy matcha greens.
					Posts are written in Markdown.
					Source is on <a href="https://github.com/yourusername/yourrepo" rel="noopener" target="_blank">GitHub</a>.
				</p>
			</div>
		</div>

	</div>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 640px) {
		.layout {
			grid-template-columns: 200px 1fr;
			gap: 4rem;
		}
	}

	/* Sidebar */
	.avatar-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.35rem;
	}

	.avatar {
		width: 100%;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		margin-bottom: 0.5rem;
		object-fit: cover;
		display: block;
	}

	.name {
		font-weight: 600;
		font-size: 1rem;
		color: var(--text);
	}

	.tagline {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 0.75rem;
	}

	.social-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		margin-top: 0.25rem;
	}

	.social-links a {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-muted);
		transition: color var(--t);
	}
	.social-links a:hover { color: var(--accent); }

	/* Bio */
	.bio h1 {
		font-size: 2rem;
		letter-spacing: -0.04em;
		margin-bottom: 1.75rem;
	}
</style>
