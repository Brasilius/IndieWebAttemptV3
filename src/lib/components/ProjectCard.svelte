<script lang="ts">
	import type { Project } from '$lib/projects.js';

	let { project }: { project: Project } = $props();
</script>

<article>
	<a href="/projects/{project.slug}" class="card">
		{#if project.image}
			<div class="card-image">
				<img src={project.image} alt={project.imageAlt ?? project.title} />
			</div>
		{/if}

		<div class="card-body">
			<h2>{project.title}</h2>
			<span class="cta" aria-hidden="true">view →</span>
		</div>
	</a>
</article>

<style>
	article {
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
		transition: border-color var(--t) var(--ease), transform 200ms var(--ease), box-shadow 200ms var(--ease);
	}

	article:hover {
		border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
		transform: translateY(-3px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--accent-ring);
	}

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
		transition: transform 0.4s var(--ease);
	}

	article:hover .card-image img {
		transform: scale(1.03);
	}

	.card-body {
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
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

	article:hover h2 { color: var(--accent); }

	.cta {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent-dim);
		white-space: nowrap;
		flex-shrink: 0;
		transition: color var(--t), letter-spacing var(--t);
	}

	article:hover .cta {
		color: var(--accent);
		letter-spacing: 0.03em;
	}
</style>
