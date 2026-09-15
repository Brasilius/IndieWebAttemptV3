<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Group posts by year
	const postsByYear = $derived(
		data.posts.reduce<Record<string, typeof data.posts>>((acc, post) => {
			const year = new Date(post.date).getFullYear().toString();
			(acc[year] ??= []).push(post);
			return acc;
		}, {})
	);

	const years = $derived(
		Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))
	);
</script>

<svelte:head>
	<title>Blog — Leo</title>
	<meta name="description" content="Writing on building, making, and living on the internet." />
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>Writing</h1>
		<p>Many, many, thoughts.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="empty">Nothing published yet.</p>
	{:else}
		{#each years as year}
			<section class="year-group">
				<h2 class="year-label">{year}</h2>
				<ul role="list" class="post-list">
					{#each postsByYear[year] as post}
						<li><PostCard {post} /></li>
					{/each}
				</ul>
			</section>
		{/each}
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

	.year-group {
		margin-bottom: 2.5rem;
	}

	.year-label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		color: var(--warm);
		letter-spacing: 0.08em;
		margin-bottom: 0.75rem;
		text-transform: uppercase;
	}

	.post-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.empty {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
