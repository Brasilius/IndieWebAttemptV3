<script lang="ts">
	import type { Project } from '$lib/projects.js';

	let { project, detailed = false }: { project: Project; detailed?: boolean } = $props();
</script>

<article class="pixel-card">
	<a href="/projects/{project.slug}" class="card">
		<div class="card-label"><span class="pixel-mark" aria-hidden="true"></span> PROJECT <span aria-hidden="true">↗</span></div>
		{#if project.image}
			<div class="card-image">
				<img src={project.image} alt={project.imageAlt ?? project.title} />
			</div>
		{/if}

		<div class="card-body" class:detailed>
			<h2>{project.title}</h2>
			{#if detailed}
				<p class="desc">{project.description}</p>
				{#if project.tags?.length}<div class="tags">{#each project.tags as tag}<span class="tag">{tag}</span>{/each}</div>{/if}
			{/if}
			<span class="cta" aria-hidden="true">view project →</span>
		</div>
	</a>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		height: 100%;
	}

	.card-image {
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-bottom: 1px solid var(--border);
		background: var(--surface-2);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;

	}

	.card-body {
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: start;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
	}

	h2 {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text);
		line-height: 1.4;
		transition: color var(--t);
		margin: 0;
	}

	article:is(:hover, :focus-within) h2 { color: var(--accent); }

	.cta {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
		white-space: nowrap;
		flex-shrink: 0;
		transition: color var(--t), letter-spacing var(--t);
	}

	article:is(:hover, :focus-within) .cta {
		color: var(--accent);
		letter-spacing: 0.03em;
	}
	.card-body.detailed { flex-direction: column; flex: 1; }
	.desc { color: var(--text-muted); font-size: 0.875rem; line-height: 1.7; }
	.tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
	.detailed .cta { margin-top: auto; padding-top: 0.5rem; }
</style>
