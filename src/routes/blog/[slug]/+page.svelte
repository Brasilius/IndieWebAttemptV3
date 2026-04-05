<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const PostContent = $derived(data.content);

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric', month: 'long', day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.metadata.title} — Leo</title>
	{#if data.metadata.description}
		<meta name="description" content={data.metadata.description} />
	{/if}
</svelte:head>

<div class="container">
	<a href="/blog" class="back-link">← all posts</a>

	<!-- IndieWeb h-entry -->
	<article class="h-entry">
		<header class="post-header">
			<div class="post-meta">
				<time class="dt-published" datetime={data.metadata.date}>
					{formatDate(data.metadata.date)}
				</time>
				{#if data.metadata.tags?.length}
					<div class="tags">
						{#each data.metadata.tags as tag}
							<span class="tag p-category">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>

			<h1 class="p-name">{data.metadata.title}</h1>

			{#if data.metadata.description}
				<p class="description p-summary">{data.metadata.description}</p>
			{/if}
		</header>

		<div class="prose e-content">
			<PostContent />
		</div>

		<footer class="post-footer">
			<hr />
			<div class="post-nav">
				<a href="/blog" class="back-link">← back to writing</a>
				<a href="#top" class="to-top">↑ top</a>
			</div>
		</footer>
	</article>
</div>

<style>
	.back-link {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 2.5rem;
		transition: color var(--t);
	}
	.back-link:hover { color: var(--accent); }

	.post-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	time {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.tags {
		display: flex;
		gap: 0.3rem;
		flex-wrap: wrap;
	}

	h1 {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		letter-spacing: -0.04em;
		line-height: 1.2;
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1.1rem;
		color: var(--text-muted);
		line-height: 1.6;
		max-width: 56ch;
	}

	.post-footer {
		margin-top: 4rem;
	}

	.post-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1.5rem;
	}

	.to-top {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		transition: color var(--t);
	}
	.to-top:hover { color: var(--accent); }
</style>
