<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Leo — making things fly!</title>
	<meta name="description" content="Personal site and digital garden." />
</svelte:head>

<div class="container">

	<!-- Hero / h-card -->
	<section class="hero h-card">
		<div class="greeting">
			<span class="hello">"Rocky and Grace Save Stars!"</span>
		</div>

		<h1>
			I'm <a class="p-name u-url" href="/" rel="me">Niels Leo Larsen 🚀</a>.
		</h1>

		<p class="bio p-note">
			Aerospace Engineer by trade, Computer Enthusiast by passion. I work across the stack, from embedded systems to finite element analysis and computational fluid dynamics and even astrodynamics! 
		</p>

		<div class="links">
			<a href="/about">more about me</a>
			<span class="sep" aria-hidden="true">·</span>
			<a href="https://github.com/brasilius" rel="me noopener" target="_blank">github</a>
			<span class="sep" aria-hidden="true">·</span>
			<a href="https://www.instagram.com/niels_leo_larsen/" rel="me noopener" target="_blank">instagram</a>
		</div>
	</section>

	<hr />

	<!-- Currently section -->
	<section class="currently">
		<h2 class="section-label">
			<span class="dot" aria-hidden="true"></span>
			currently
		</h2>
		<ul>
			<li><span class="key">reading</span> <span class="val">Project Hail Mary — Andy Weir</span></li>
			<li><span class="key">building</span> <span class="val">a new payload 😭</span></li>
			<li><span class="key">learning</span> <span class="val">about Paul Atreides</span></li>
		</ul>
		<a href="/now" class="now-link">full /now page →</a>
	</section>

	<hr />

	<!-- Recent projects -->
	<section class="recent-projects">
		<div class="section-header">
			<h2 class="section-label">
				<span class="dot" aria-hidden="true"></span>
				recent projects
			</h2>
			<a href="/projects" class="see-all">all projects →</a>
		</div>

		{#if data.projects.length}
			<div class="post-grid">
				{#each data.projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<p class="empty">Nothing yet — coming soon.</p>
		{/if}
	</section>

	<hr />

	<!-- Recent posts -->
	<section class="recent-posts">
		<div class="section-header">
			<h2 class="section-label">
				<span class="dot" aria-hidden="true"></span>
				recent writing
			</h2>
			<a href="/blog" class="see-all">all posts →</a>
		</div>

		{#if data.posts.length}
			<div class="post-grid">
				{#each data.posts as post}
					<PostCard {post} />
				{/each}
			</div>
		{:else}
			<p class="empty">Nothing yet — coming soon.</p>
		{/if}
	</section>

</div>

<style>
	hr {
		margin-block: 3rem;
	}

	/* Hero */
	.hero {
		padding-top: 3rem;
		padding-bottom: 1rem;
	}

	.greeting {
		margin-bottom: 1rem;
	}

	.hello {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--accent);
		background: var(--accent-glow);
		border: 1px solid var(--accent-ring);
		padding: 0.25rem 0.75rem;
		border-radius: 99px;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--text);
		margin-top: 1.25rem;
		margin-bottom: 1rem;
	}

	h1 a {
		color: inherit;
		background: linear-gradient(135deg, var(--accent) 0%, var(--warm) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.bio {
		font-size: 1.1rem;
		color: var(--text-muted);
		max-width: 52ch;
		line-height: 1.7;
		margin-bottom: 1.75rem;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		flex-wrap: wrap;
	}

	.links a {
		color: var(--text-muted);
		transition: color var(--t);
	}
	.links a:hover { color: var(--accent); }
	.sep { color: var(--text-faint); }

	/* Currently */
	.currently ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.currently li {
		font-size: 0.9rem;
		display: flex;
		gap: 0.75rem;
	}

	.key {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
		min-width: 70px;
		padding-top: 0.1em;
	}

	.val { color: var(--text-muted); }

	.now-link {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--accent-dim);
		transition: color var(--t);
	}
	.now-link:hover { color: var(--accent); }

	/* Section header */
	.section-label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: lowercase;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: 0.04em;
	}

	.section-label .dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		flex-shrink: 0;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.see-all {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		transition: color var(--t);
	}
	.see-all:hover { color: var(--accent); }

	/* Post grid */
	.post-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 560px) {
		.post-grid { grid-template-columns: repeat(2, 1fr); }
	}

	.empty {
		color: var(--text-muted);
		font-style: italic;
		font-size: 0.9rem;
	}

	/* Currently section spacing */
	.currently .section-label {
		margin-bottom: 1.25rem;
	}

	.recent-posts .section-label,
	.recent-projects .section-label {
		margin-bottom: 0;
	}
</style>
