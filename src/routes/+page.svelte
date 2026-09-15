<script lang="ts">
	import LaunchScene from '$lib/components/LaunchScene.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Leo — making things fly!</title>
	<meta name="description" content="Personal site and digital garden." />
	<meta property="og:title" content="Leo — making things fly!" />
	<meta property="og:description" content="Aerospace engineer by trade, computer enthusiast by passion." />
	<meta property="og:url" content="https://nielslarsen.dev/" />
</svelte:head>

<LaunchScene />

<div class="container ground-content" id="on-the-ground" tabindex="-1">
	<div class="ground-intro">
		<p class="ground-label">BACK ON THE GROUND</p>
		<h2>A few things in my orbit.</h2>
		<p>I work across the stack, from embedded systems to finite element analysis, computational fluid dynamics, and astrodynamics. This is where I keep what I’m building, learning, and figuring out along the way.</p>
		<a href="https://www.instagram.com/niels_leo_larsen/" rel="me noopener" target="_blank">Field notes on Instagram ↗</a>
	</div>
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

	.ground-content { padding-top: 4rem; scroll-margin-top: calc(var(--nav-height) + 1.5rem); }
	.ground-intro h2 { font-size: clamp(1.7rem, 4vw, 2.4rem); margin-bottom: 1rem; }
	.ground-intro p:not(.ground-label) { color: var(--text-muted); line-height: 1.8; }
	.ground-label { font: 0.65rem var(--font-mono); letter-spacing: 0.13em; color: var(--accent); margin-bottom: 1rem; }
	.ground-intro a { display: inline-block; margin-top: 1rem; font: 0.75rem var(--font-mono); }

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
