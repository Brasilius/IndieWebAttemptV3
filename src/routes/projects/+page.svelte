<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
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
				<li><ProjectCard {project} detailed /></li>
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

	.empty {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
