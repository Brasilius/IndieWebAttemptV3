<script lang="ts">
	import type { Post } from '$lib/posts.js';

	let { post }: { post: Post } = $props();

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric', month: 'short', day: 'numeric'
		});
	}
</script>

<article>
	<a href="/blog/{post.slug}" class="card">
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

		<span class="cta" aria-hidden="true">read →</span>
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
		display: block;
		padding: 1.5rem;
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

	article:hover h2 { color: var(--accent); }

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
		color: var(--accent-dim);
		transition: color var(--t), letter-spacing var(--t);
	}

	article:hover .cta {
		color: var(--accent);
		letter-spacing: 0.03em;
	}
</style>
