<script lang="ts">
	import type { PageData } from './$types';
	import type { Post } from '$lib/posts';
	import type { Project } from '$lib/projects';

	let { data }: { data: PageData } = $props();

	let query = $state('');

	function matchesQuery(text: string, q: string): boolean {
		const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
		const haystack = text.toLowerCase();
		return words.length > 0 && words.every((word) => haystack.includes(word));
	}

	let results = $derived.by(() => {
		const q = query.trim();
		if (!q) return null;

		const matchedPosts = data.posts.filter((post: Post) => {
			const text = [post.title, post.description, ...(post.tags ?? []), data.postContent[post.slug] ?? ''].join(' ');
			return matchesQuery(text, q);
		});

		const matchedProjects = data.projects.filter((project: Project) => {
			const text = [project.title, project.description, ...(project.tags ?? []), data.projectContent[project.slug] ?? ''].join(' ');
			return matchesQuery(text, q);
		});

		return { posts: matchedPosts, projects: matchedProjects };
	});

	let totalCount = $derived(results ? results.posts.length + results.projects.length : 0);

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>search — leo</title>
</svelte:head>

<div class="page">
	<div class="container">
		<header class="page-header">
			<h1>search</h1>
			<p class="subtitle">search across posts and projects</p>
		</header>

		<div class="search-wrap">
			<label for="search-input" class="sr-only">Search</label>
			<div class="input-row">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<circle cx="11" cy="11" r="8"/>
					<line x1="21" y1="21" x2="16.65" y2="16.65"/>
				</svg>
				<!-- svelte-ignore a11y_autofocus -->
				<input
					id="search-input"
					type="search"
					placeholder="type to search…"
					bind:value={query}
					autofocus
					autocomplete="off"
					spellcheck="false"
				/>
				{#if query}
					<button class="clear-btn" onclick={() => (query = '')} aria-label="Clear search">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<line x1="18" y1="6" x2="6" y2="18"/>
							<line x1="6" y1="6" x2="18" y2="18"/>
						</svg>
					</button>
				{/if}
			</div>
		</div>

		{#if results === null}
			<p class="hint">start typing to find posts and projects</p>
		{:else if totalCount === 0}
			<div class="empty">
				<p>no results for <span class="query-echo">"{query}"</span></p>
				<p class="hint-small">try different words or check your spelling</p>
			</div>
		{:else}
			<p class="result-count">
				{totalCount} result{totalCount === 1 ? '' : 's'} for <span class="query-echo">"{query}"</span>
			</p>

			{#if results.posts.length > 0}
				<section class="section">
					<h2 class="section-label">
						<span>posts</span>
						<span class="count">{results.posts.length}</span>
					</h2>
					<ul class="results-list" role="list">
						{#each results.posts as post}
							<li>
								<a href="/blog/{post.slug}" class="result-card">
									<div class="result-meta">
										<time datetime={post.date}>{formatDate(post.date)}</time>
										{#if post.tags?.length}
											<div class="tags">
												{#each post.tags.slice(0, 3) as tag}
													<span class="tag">{tag}</span>
												{/each}
											</div>
										{/if}
									</div>
									<h3>{post.title}</h3>
									{#if post.description}
										<p class="result-desc">{post.description}</p>
									{/if}
									<span class="cta" aria-hidden="true">read →</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if results.projects.length > 0}
				<section class="section">
					<h2 class="section-label">
						<span>projects</span>
						<span class="count">{results.projects.length}</span>
					</h2>
					<ul class="results-list" role="list">
						{#each results.projects as project}
							<li>
								<a href="/projects/{project.slug}" class="result-card">
									<div class="result-meta">
										<time datetime={project.date}>{formatDate(project.date)}</time>
										{#if project.tags?.length}
											<div class="tags">
												{#each project.tags.slice(0, 3) as tag}
													<span class="tag">{tag}</span>
												{/each}
											</div>
										{/if}
									</div>
									<h3>{project.title}</h3>
									{#if project.description}
										<p class="result-desc">{project.description}</p>
									{/if}
									<span class="cta" aria-hidden="true">view →</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		{/if}
	</div>
</div>

<style>
	.page {
		padding: 4rem 0 6rem;
	}

	.page-header {
		margin-bottom: 2.5rem;
	}

	h1 {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--text);
		margin-bottom: 0.35rem;
	}

	.subtitle {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	/* Search input */
	.search-wrap {
		margin-bottom: 2rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 0.75rem 1rem;
		transition: border-color var(--t), box-shadow var(--t);
	}

	.input-row:focus-within {
		border-color: var(--accent-dim);
		box-shadow: 0 0 0 3px var(--accent-ring);
	}

	.search-icon {
		color: var(--text-muted);
		flex-shrink: 0;
	}

	input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		color: var(--text);
		min-width: 0;
	}

	input::placeholder {
		color: var(--text-faint);
	}

	input::-webkit-search-cancel-button {
		display: none;
	}

	.clear-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.2rem;
		color: var(--text-muted);
		display: flex;
		align-items: center;
		border-radius: var(--radius);
		transition: color var(--t), background var(--t);
		flex-shrink: 0;
	}

	.clear-btn:hover {
		color: var(--text);
		background: var(--surface-2);
	}

	/* States */
	.hint {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-faint);
		text-align: center;
		padding: 3rem 0;
	}

	.empty {
		text-align: center;
		padding: 3rem 0;
	}

	.empty p {
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}

	.hint-small {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-faint) !important;
	}

	.query-echo {
		color: var(--accent);
		font-family: var(--font-mono);
	}

	.result-count {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--text-muted);
		margin-bottom: 2rem;
	}

	/* Sections */
	.section {
		margin-bottom: 2.5rem;
	}

	.section-label {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 1rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid var(--border);
	}

	.section-label .count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		padding: 0 6px;
		background: var(--accent-glow);
		color: var(--accent);
		border-radius: 99px;
		font-size: 0.72rem;
	}

	/* Result cards */
	.results-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.result-card {
		display: block;
		padding: 1.25rem 1.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: inherit;
		transition: border-color var(--t) var(--ease), transform 200ms var(--ease), box-shadow 200ms var(--ease);
	}

	.result-card:hover {
		border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
		transform: translateY(-2px);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--accent-ring);
	}

	.result-meta {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		margin-bottom: 0.6rem;
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

	h3 {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.4rem;
		line-height: 1.4;
		transition: color var(--t);
	}

	.result-card:hover h3 {
		color: var(--accent);
	}

	.result-desc {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 0.75rem;
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

	.result-card:hover .cta {
		color: var(--accent);
		letter-spacing: 0.03em;
	}
</style>
