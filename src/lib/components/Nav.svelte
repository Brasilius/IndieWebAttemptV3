<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const links = [
		{ href: '/about',    label: 'about'    },
		{ href: '/blog',     label: 'blog'     },
		{ href: '/projects', label: 'projects' },
		{ href: '/resume',   label: 'resume'   },
		{ href: '/now',      label: 'now'      },
	];

	function isActive(href: string) {
		const path = $page.url.pathname;
		return path === href || (href !== '/' && path.startsWith(href + '/'));
	}

	let light = $state(false);

	onMount(() => {
		light = localStorage.getItem('theme') === 'light';
		applyTheme(light);
	});

	function applyTheme(isLight: boolean) {
		document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
	}

	function toggleTheme() {
		light = !light;
		localStorage.setItem('theme', light ? 'light' : 'dark');
		applyTheme(light);
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

		<button
			class="theme-toggle"
			onclick={toggleTheme}
			aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
			aria-pressed={light}
		>
			<span class="track">
				<span class="thumb">
					{#if light}
						<!-- sun -->
						<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="4"/>
							<line x1="12" y1="2" x2="12" y2="4"/>
							<line x1="12" y1="20" x2="12" y2="22"/>
							<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
							<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
							<line x1="2" y1="12" x2="4" y2="12"/>
							<line x1="20" y1="12" x2="22" y2="12"/>
							<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
							<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
						</svg>
					{:else}
						<!-- moon -->
						<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
						</svg>
					{/if}
				</span>
			</span>
		</button>
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

	/* Theme toggle */
	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin-left: 0.5rem;
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.track {
		display: flex;
		align-items: center;
		width: 40px;
		height: 22px;
		border-radius: 99px;
		background: var(--surface-2);
		border: 1px solid var(--border);
		padding: 2px;
		transition: background var(--t), border-color var(--t);
		position: relative;
	}

	.thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--accent);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--bg);
		transition: transform var(--t), background var(--t);
		transform: translateX(0);
	}

	:global([data-theme="light"]) .thumb {
		transform: translateX(18px);
	}

	@media (max-width: 480px) {
		ul {
			gap: 0;
		}

		ul a {
			font-size: 0.75rem;
			padding: 0.35rem 0.5rem;
		}

		.wordmark {
			font-size: 0.95rem;
		}
	}
</style>
