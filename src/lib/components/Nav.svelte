<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{ href: '/about', label: 'about' },
		{ href: '/blog',  label: 'blog'  },
		{ href: '/now',   label: 'now'   },
	];

	function isActive(href: string) {
		const path = $page.url.pathname;
		return path === href || (href !== '/' && path.startsWith(href + '/'));
	}
</script>

<header>
	<nav class="container">
		<a href="/" class="logo" aria-label="Home">
			<span class="dot" aria-hidden="true"></span>
			<span class="wordmark">leo<span class="accent">.</span></span>
		</a>

		<ul role="list">
			{#each links as link}
				<li>
					<a href={link.href} class:active={isActive(link.href)}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 100;
		height: var(--nav-height);
		display: flex;
		align-items: center;
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border);
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* Logo */
	.logo {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--text);
		transition: opacity var(--t);
	}
	.logo:hover { opacity: 0.8; color: var(--text); }

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent-glow);
		flex-shrink: 0;
	}

	.wordmark {
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.03em;
	}
	.accent { color: var(--accent); }

	/* Nav links */
	ul {
		list-style: none;
		display: flex;
		gap: 0.15rem;
	}

	ul a {
		display: block;
		padding: 0.4rem 0.8rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-muted);
		border-radius: var(--radius);
		transition: color var(--t), background var(--t);
		text-decoration: none;
	}

	ul a:hover,
	ul a.active {
		color: var(--accent);
		background: var(--accent-glow);
	}

	ul a.active { color: var(--accent); }
</style>
