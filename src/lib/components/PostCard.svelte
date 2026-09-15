<script lang="ts">
	import type { Post } from '$lib/posts.js';

	let { post }: { post: Post } = $props();

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric', month: 'short', day: 'numeric'
		});
	}
</script>

<article class="pixel-card">
	<a href="/blog/{post.slug}" class="card">
		<div class="card-label"><span class="pixel-mark" aria-hidden="true"></span> FIELD NOTES <span aria-hidden="true">↗</span></div>
		<div class="card-body">
		<div class="meta">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if post.tags?.length}
				<div class="tags" aria-label="Tags">
					{#each post.tags.slice(0, 3) as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>

		<h2>{post.title}</h2>

		{#if post.description}
			<p class="desc">{post.description}</p>
		{/if}

		<span class="cta" aria-hidden="true">read entry →</span>
		</div>
	</a>
</article>

<style>
	.card {
		display: block;

		text-decoration: none;
		color: inherit;
		height: 100%;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
	}

	time {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.tags {
		display: flex;
		gap: 0.3rem;
		flex-wrap: wrap;
	}

	h2 {
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.5rem;
		line-height: 1.4;
		transition: color var(--t);
	}

	article:is(:hover, :focus-within) h2 { color: var(--accent); }

	.desc {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 1.25rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.cta {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
		transition: color var(--t), letter-spacing var(--t);
	}

	article:is(:hover, :focus-within) .cta {
		color: var(--accent);
		letter-spacing: 0.03em;
	}
	.card-body { padding: 1.25rem; }
</style>
