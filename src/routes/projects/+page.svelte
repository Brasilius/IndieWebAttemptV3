<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects — Leo</title>
	<meta name="description" content="Things I've built and am currently building." />
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>Projects</h1>
		<p>Things I've built and am currently building.</p>
	</header>

	{#if data.projects.length === 0}
		<p class="empty">Nothing here yet.</p>
	{:else}
		<ul class="project-grid" role="list">
			{#each data.projects as project}
				<li class="project-card">
					<a href="/projects/{project.slug}" class="card-link-overlay" aria-label={project.title}>
						{#if project.image}
							<div class="card-image">
								<img src={project.image} alt={project.imageAlt ?? project.title} />
							</div>
						{/if}

						<div class="card-body">
							<div class="card-meta">
								{#if project.tags?.length}
									<div class="tags">
										{#each project.tags as tag}
											<span class="tag">{tag}</span>
										{/each}
									</div>
								{/if}
							</div>

							<h2 class="card-title">{project.title}</h2>
							<p class="card-desc">{project.description}</p>

							<span class="card-link">read more →</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.page-header {
		margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.page-header h1 {
		font-size: 2.25rem;
		letter-spacing: -0.04em;
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: var(--text-muted);
		font-size: 1rem;
	}

	.project-grid {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 560px) {
		.project-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.project-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: border-color var(--t), transform var(--t), box-shadow var(--t);
	}

	.project-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.card-link-overlay {
		display: flex;
		flex-direction: column;
		flex: 1;
		text-decoration: none;
		color: inherit;
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

	.project-card:hover .card-image img {
		transform: scale(1.03);
	}

	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tags {
		display: flex;
		gap: 0.3rem;
		flex-wrap: wrap;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--accent);
		background: var(--accent-glow);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}

	.card-title {
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--text);
		margin: 0;
	}

	.card-desc {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.55;
		flex: 1;
		margin: 0;
	}

	.card-link {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
		text-decoration: none;
		margin-top: 0.25rem;
		transition: opacity var(--t);
	}

	.card-link:hover {
		opacity: 0.75;
	}

	.empty {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
