<script lang="ts">
	// Two actual poses: the hood/chest settle and the arms/tentacles shift a pixel.
	let { paused = false }: { paused?: boolean } = $props();
</script>

<svg class:paused viewBox="0 0 64 88" role="img" aria-label="Pixel Xûr, a hooded merchant with glowing yellow eyes, gently breathing" shape-rendering="crispEdges">
	<defs>
		<g id="xur-body">
			<!-- Backpack, weathered coat, and slightly hunched stance. -->
			<path fill="#191c22" d="M14 28h31v6h5v33h-5v7H13V36h1z" />
			<path fill="#3b4149" d="M14 31h8v38h-9V39h-2v-4h3zm29 2h6v28h-5z" />
			<path fill="#242a31" d="M22 30h22v42H18V42h4z" />
			<path fill="#4d535a" d="M19 33h5v8h-5zm21 0h5v8h-5zM19 44h4v13h-4zm20 0h4v13h-4z" />
			<path fill="#777369" d="M23 38h17v3H23zm-2 17h21v4H21z" />
			<path fill="#aba083" d="M30 55h5v4h-5z" />
			<path fill="#373d44" d="M18 60h11v16H15v-6h3zm17 0h9v11h3v5H34z" />
			<path fill="#14171d" d="M19 75h10v6H16v-3h3zm15 0h10v3h4v3H34z" />
			<path fill="#5a5e5f" d="M17 63h6v2h-6zm20 2h7v2h-7z" />
			<path fill="#918877" d="M13 38h5v3h-5zm32 2h4v3h-4z" />
		</g>
		<g id="xur-head">
			<path fill="#171a20" d="M26 5h13v3h5v5h4v16h-4v6H22v-4h-5V17h3v-6h6z" />
			<path fill="#444951" d="M26 7h12v3H26zm-5 7h5v-4h-3v4h-2v14h3V17h2v-3zm18-3h4v5h3v12h-4V17h-3z" />
			<path fill="#292e37" d="M26 10h13v5h3v15H24V16h2z" />
			<path fill="#0b0d13" d="M26 16h13v3h3v10H24V19h2z" />
			<path fill="#e6c777" d="M26 20h4v2h-4zm10 0h4v2h-4z" />
			<path fill="#fff0b5" d="M27 20h2v1h-2zm10 0h2v1h-2z" />
			<path fill="#303640" d="M28 25h3v9h-3zm5 0h3v12h-3zm5 0h2v8h-2z" />
			<path fill="#565b61" d="M29 27h1v6h-1zm5 0h1v8h-1z" />
		</g>
	</defs>
	<path fill="#292c32" d="M12 83h39v3H12z" />
	<g class="frame first">
		<use href="#xur-body" />
		<use href="#xur-head" />
		<path fill="#30363e" d="M11 42h8v17h-3v5h-6V49h1zm32 1h7v17h-2v6h-6V54h1z" />
		<path fill="#646769" d="M11 60h5v5h-5zm31 2h6v5h-6z" />
	</g>
	<g class="frame second">
		<use href="#xur-body" />
		<use href="#xur-head" transform="translate(0 1)" />
		<path fill="#30363e" d="M11 43h8v17h-2v5h-6V50h0zm32 1h7v17h-3v6h-5V55h1z" />
		<path fill="#646769" d="M12 61h5v5h-5zm30 3h5v5h-5z" />
	</g>
</svg>

<style>
	svg { display: block; width: 192px; max-width: 100%; image-rendering: pixelated; }
	.frame { animation: idle 2.4s steps(1, end) infinite; }
	.second { animation-name: idle-second; visibility: hidden; }
	@keyframes idle { 0%, 100% { visibility: visible; } 50% { visibility: hidden; } }
	@keyframes idle-second { 0%, 100% { visibility: hidden; } 50% { visibility: visible; } }
	.paused .frame { animation-play-state: paused; }
	@media (prefers-reduced-motion: reduce) {
		.frame { animation: none; }
		.second { visibility: hidden; }
	}
</style>
