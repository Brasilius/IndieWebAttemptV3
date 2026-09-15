<script lang="ts">
	let { animated = false }: { animated?: boolean } = $props();
	const letters = [
		['11000', '11000', '11000', '11000', '11000', '11111', '11111'],
		['11111', '11111', '11000', '11110', '11000', '11111', '11111'],
		['01110', '11011', '11011', '11011', '11011', '11011', '01110']
	];
</script>

					<svg class:animated viewBox="0 0 190 74" shape-rendering="crispEdges" aria-hidden="true">
						{#each letters as letter, l}
							{#each letter as row, y}
								{#each [...row] as cell, x}
									{#if cell === '1'}<rect class="logo-pixel" x={l * 60 + x * 10} y={y * 10} width="10" height="10" style={`--delay: ${-(x + y + l) * 0.19}s`} />{/if}
								{/each}
							{/each}
						{/each}
						<rect x="180" y="60" width="10" height="10" fill="var(--warm)" />
					</svg>

<style>
	svg { display: block; width: 100%; overflow: visible; }
	.logo-pixel { fill: var(--leaf, var(--accent)); }
	.animated .logo-pixel { animation: phosphor 6s steps(1) infinite; animation-delay: var(--delay); animation-play-state: var(--logo-play-state, running); }
	@keyframes phosphor {
		0%, 88%, 100% { fill: var(--leaf, var(--accent)); }
		90%, 94% { fill: var(--sand, var(--warm)); }
		96% { fill: var(--cream, var(--text)); }
	}
	@media (prefers-reduced-motion: reduce) { .animated .logo-pixel { animation: none; } }
</style>
