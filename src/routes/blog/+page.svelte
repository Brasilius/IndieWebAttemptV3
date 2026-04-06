<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric', month: 'short', day: 'numeric'
		});
	}

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
						<li>
							<a href="/blog/{post.slug}" class="post-row">
								<span class="title">{post.title}</span>
								<span class="spacer" aria-hidden="true"></span>
								<time datetime={post.date}>{formatDate(post.date)}</time>
							</a>
							{#if post.tags?.length}
								<div class="tags">
									{#each post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							{/if}
						</li>
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
		color: var(--text-faint);
		letter-spacing: 0.08em;
		margin-bottom: 0.75rem;
		text-transform: uppercase;
	}

	.post-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.post-row {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 0.65rem 0.85rem;
		border-radius: var(--radius);
		color: inherit;
		text-decoration: none;
		transition: background var(--t);
		margin-inline: -0.85rem;
	}

	.post-row:hover {
		background: var(--surface-2);
	}

	.post-row:hover .title {
		color: var(--accent);
	}

	.title {
		font-size: 0.975rem;
		font-weight: 500;
		color: var(--text);
		transition: color var(--t);
		flex-shrink: 0;
	}

	.spacer {
		flex: 1;
		height: 1px;
		border-bottom: 1px dashed var(--border);
		margin-bottom: 3px;
		min-width: 1rem;
	}

	time {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-muted);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.tags {
		display: flex;
		gap: 0.3rem;
		padding: 0.25rem 0.85rem 0.5rem;
		flex-wrap: wrap;
	}

	.empty {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
