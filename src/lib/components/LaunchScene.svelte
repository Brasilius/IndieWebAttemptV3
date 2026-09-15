<script lang="ts">
	import { onMount } from 'svelte';

	let journey: HTMLElement;
	let progress = $state(0);
	let reducedMotion = $state(false);
	let paused = $state(false);
	let pausedFlight = $state(0);
	let ready = $state(false);
	let visible = $state(true);
	const clamp = (value: number) => Math.min(1, Math.max(0, value));
	let still = $derived(reducedMotion || paused);
	let flight = $derived(reducedMotion ? 0 : paused ? pausedFlight : clamp((progress - 0.08) / 0.82));
	let stage = $derived(progress < 0.08 ? 0 : progress < 0.35 ? 1 : progress < 0.72 ? 2 : 3);
	const stages = ['On the launchpad', 'A little less Earth.', 'A little more possibility.', 'Keep looking up.'];
	const notes = ['Every good flight starts with a little curiosity.', 'From an idea on paper to something in the sky.', 'Hardware, software, and everything in between.', 'There’s always something else to figure out.'];
	const letters = [
		['11000', '11000', '11000', '11000', '11000', '11111', '11111'],
		['11111', '11111', '11000', '11110', '11000', '11111', '11111'],
		['01110', '11011', '11011', '11011', '11011', '11011', '01110']
	];
	const stars = Array.from({ length: 68 }, (_, i) => ({
		x: (i * 137 + 31) % 1000, y: (i * 73 + 17) % 570,
		size: i % 7 === 0 ? 3 : 2, delay: -(i % 9)
	}));
	const smoke = Array.from({ length: 14 }, (_, i) => ({
		x: (i % 2 ? 1 : -1) * (12 + Math.floor(i / 2) * 19),
		y: (i * 13) % 31, size: 13 + (i % 4) * 7
	}));

	onMount(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updatePreference = () => { reducedMotion = preference.matches; };
		updatePreference();
		ready = true;
		let frame = 0;
		const update = () => {
			frame = 0;
			const rect = journey.getBoundingClientRect();
			const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 60;
			progress = clamp((navHeight - rect.top) / Math.max(1, journey.offsetHeight - (window.innerHeight - navHeight)));
		};
		const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
		const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
		observer.observe(journey);
		preference.addEventListener('change', updatePreference);
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		update();
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			preference.removeEventListener('change', updatePreference);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});
</script>

<section class="journey" class:ready class:still class:reduced={reducedMotion} class:asleep={!visible} bind:this={journey} aria-label="Making things fly — a scroll-driven pixel rocket launch">
	<div class="stage" style={`--flight: ${flight}; --ignition: ${clamp(flight * 12)};`}>
		<div class="scene-art" aria-hidden="true">
			<svg class="landscape" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges">
				<rect width="1000" height="650" fill="var(--sky)" />
				<g class="stars" style={`opacity: ${0.25 + flight * 0.75}; transform: translateY(${Math.round(flight * 65)}px)`}>
					{#each stars as star, i}
						<g class="star" style={`--delay: ${star.delay}s`}>
							<rect x={star.x} y={star.y} width={star.size} height={star.size} fill={i % 3 ? 'var(--sand)' : 'var(--leaf)'} />
							{#if i % 7 === 0}<path d={`M${star.x - 3} ${star.y + 1}h9M${star.x + 1} ${star.y - 3}v9`} stroke="var(--sand)" />{/if}
						</g>
					{/each}
				</g>
				<g style={`transform: translateY(${Math.round(35 + flight * 95)}px); opacity: ${1 - flight * 0.45}`}>
					<path d="M817 62h40v8h16v12h8v40h-8v12h-16v8h-40v-8h-16v-12h-8V82h8V70h16Z" fill="var(--moon)" />
					<path d="M817 62h16v8h-8v12h-8v32h8v12h16v8h16v8h-40v-8h-16v-12h-8V82h8V70h16Z" fill="var(--moon-shade)" />
					<path d="M849 84h8v8h-8zM833 110h12v8h-12z" fill="var(--moon-shade)" />
				</g>
				<g class="high-cloud" style={`transform: translate(${Math.round(-flight * 100)}px, ${Math.round(flight * 310)}px); opacity: ${1 - flight}`} fill="var(--cloud)">
					<path d="M520 230h30v-8h50v8h30v8h25v8H495v-8h25zM860 282h24v-10h42v10h36v8h-102z" />
				</g>
				<g style={`transform: translateY(${Math.round(flight * 440)}px)`}>
					<path d="M0 461h40v-20h40v-30h35v-25h35v-25h28v35h35v25h32v32h55v-15h40v-35h45v-32h30v-20h28v20h25v42h45v20h70v-30h45v-35h35v-40h35v-20h30v32h25v28h45v38h60v-20h42v-30h30v-35h32v-15h30v35h42v50h40v190H0Z" fill="var(--mountain-far)" />
					<path d="M115 411h35v-25h28v35h35v25h-63v20h-35zM385 403h30v-32h28v20h25v42h-28v-15h-55zM655 383h35v-35h30v32h25v28h-55v18h-35z" fill="var(--mountain-lit)" />
				</g>
				<g style={`transform: translateY(${Math.round(flight * 630)}px)`}>
					<path d="M0 529h55v-12h60v-18h40v-22h65v12h45v30h55v13h80v-10h85v-18h95v16h70v14h75v-15h90v-22h55v-20h50v15h35v30h40v-15h55v143H0Z" fill="var(--mountain-near)" />
					<path d="M0 582h140v-8h90v8h160v-8h240v-8h140v8h230v76H0Z" fill="var(--ground)" />
					<path d="M0 598h130v4H0zM188 625h170v4H188zM836 594h110v4H836zM430 605h80v4h-80z" fill="var(--terrain-detail)" />
					<!-- A wind sock, scrub, and a very small field station. -->
					<path d="M85 578v-56h4v56zM89 522h16v4h16v4h-16v4H89z" fill="var(--sand)" />
					<path d="M89 526h8v4h-8zM105 526h8v4h-8z" fill="var(--rust)" />
					<path d="M238 581v-26h5v12h8v-18h5v23h-13v9zM913 577v-25h5v8h9v-15h5v21h-14v11z" fill="var(--leaf-dark)" />
					<path d="M351 575v-29h9v-9h43v9h9v29z" fill="var(--terrain-detail)" />
					<path d="M361 549h14v10h-14zM386 549h15v10h-15z" fill="var(--leaf)" />
					<!-- Open steel launch gantry. -->
					<path d="M599 564V363h5v201M637 564V363h5v201M599 363h43v5h-43M599 400h43M599 440h43M599 480h43M599 520h43M604 368l33 32-33 40 33 40-33 40 33 39" fill="none" stroke="var(--gantry)" stroke-width="4" />
					<path d="M639 410h38v5h-38zM639 482h38v5h-38z" fill="var(--gantry)" />
					<rect class="beacon" x="616" y="354" width="8" height="6" fill="var(--sand)" />
					<path d="M580 564h172v10H580zM592 574h148v8H592z" fill="var(--sand)" />
					{#each Array.from({ length: 12 }) as _, i}<rect x={592 + i * 12} y="574" width="6" height="8" fill="var(--ground)" />{/each}
					<g style={`opacity: ${clamp(flight * 15)}`}>
						{#each smoke as puff, i}
							<g class="smoke" style={`--delay: ${-i * 0.23}s; --drift: ${puff.x > 0 ? 20 : -20}px;`}>
								<path d={`M${697 + puff.x} ${550 + puff.y}h${puff.size}v-6h${puff.size / 2}v6h6v${puff.size}h-${puff.size + 6}v-6h-${puff.size / 2}z`} fill={i % 2 ? 'var(--smoke)' : 'var(--cloud)'} />
							</g>
						{/each}
					</g>
				</g>
				<!-- Hand-built sprite: every contour stays on the pixel grid. -->
				<g style={`transform: translate(${Math.round(flight * 12)}px, ${Math.round(-flight * 260)}px)`}>
					<g class="rocket">
						<g class="exhaust" style={`opacity: ${clamp(flight * 20)}`}>
							<path d="M686 550h24v20h-4v24h-4v24h-8v-16h-4v-28h-4z" fill="var(--rust)" />
							<path d="M690 550h16v22h-4v20h-8v-20h-4z" fill="var(--sand)" />
							<path d="M694 550h8v22h-8z" fill="var(--cream)" />
						</g>
						<path d="M694 390h8v8h4v12h4v16h-24v-16h4v-12h4z" fill="var(--leaf)" />
						<path d="M702 398h4v12h4v16h-8z" fill="var(--leaf-dark)" />
						<path d="M686 426h24v104h-24z" fill="var(--cream)" />
						<path d="M702 426h8v104h-8z" fill="var(--sand)" />
						<path d="M686 433h24v8h-24zM686 495h24v8h-24z" fill="var(--leaf-dark)" />
						<path d="M691 451h14v18h-14z" fill="var(--leaf-dark)" />
						<path d="M694 454h8v10h-8z" fill="var(--sky)" />
						<path d="M694 454h4v4h-4z" fill="var(--leaf)" />
						<path d="M682 510h4v28h-4v8h-12v-16h4v-12h8zM710 510h4v8h8v12h4v16h-12v-8h-4z" fill="var(--leaf)" />
						<path d="M714 526h4v16h8v4h-12zM682 518h4v20h-4z" fill="var(--leaf-dark)" />
						<path d="M686 530h24v12h-24z" fill="var(--leaf-dark)" />
						<path d="M690 542h16v8h4v4h-24v-4h4z" fill="var(--sand)" />
						<path d="M694 481h8v3h-8zM696 478h4v9h-4z" fill="var(--rust)" />
					</g>
				</g>
			</svg>
		</div>

		<div class="scene-content">
			<div class="scene-topline"><span>NIELS LEO LARSEN / PERSONAL EXPLORATIONS</span><span class="edition">EST. ON EARTH</span></div>
			<div class="intro h-card">
				<p class="greeting">“Amaze, amaze, amaze!”</p>
				<a href="/about" class="pixel-logo" aria-label="Leo — more about me">
					<svg viewBox="0 0 190 74" shape-rendering="crispEdges" aria-hidden="true">
						{#each letters as letter, l}
							{#each letter as row, y}
								{#each [...row] as cell, x}
									{#if cell === '1'}<rect class="logo-pixel" x={l * 60 + x * 10} y={y * 10} width="10" height="10" style={`--delay: ${-(x + y + l) * 0.19}s`} />{/if}
								{/each}
							{/each}
						{/each}
						<rect x="180" y="60" width="10" height="10" fill="var(--warm)" />
					</svg>
				</a>
				<h1>Making things fly<span>.</span></h1>
				<p class="bio p-note">I’m <a href="/about" class="p-name u-url">Niels Leo Larsen</a>.<br />Aerospace engineer by trade.<br />Computer enthusiast by passion.</p>
				<div class="intro-links"><a href="/about">Meet the engineer <span aria-hidden="true">↗</span></a><a href="https://github.com/brasilius" rel="me noopener" target="_blank">GitHub <span aria-hidden="true">↗</span></a></div>
			</div>
			<div class="flight-caption" aria-hidden="true"><span class="chapter">0{stage + 1} / FLIGHT NOTES</span><p>{stages[stage]}</p><span class="note">{notes[stage]}</span></div>
			<div class="scene-bottomline">
				<span class="scroll-cue">↓ <span>{reducedMotion ? 'A moment on the launchpad' : paused ? 'Flight paused' : 'Scroll to launch'}</span></span>
				<div class="scene-actions">
					{#if ready && !reducedMotion}<button onclick={() => { pausedFlight = flight; paused = !paused; }} aria-pressed={paused}>{paused ? 'Enable motion' : 'Pause motion'}</button>{/if}
					<a href="#on-the-ground">Skip to content ↓</a>
				</div>
			</div>
			<div class="flight-track" aria-hidden="true"><span style={`transform: scaleX(${progress})`}></span></div>
		</div>
	</div>
</section>

<style>
	.journey { --sky: #11140f; --leaf: #9dc87a; --leaf-dark: #587346; --sand: #c8a96e; --cream: #e2d9c8; --rust: #b9784c; --moon: #b9b68a; --moon-shade: #878961; --cloud: #343d2e; --smoke: #68715a; --mountain-far: #252e21; --mountain-lit: #343d2b; --mountain-near: #3b4931; --ground: #1b2419; --terrain-detail: #46533a; --gantry: #637153; position: relative; margin-top: -3rem; }
	.journey.ready:not(.reduced) { height: 300svh; }
	.stage { position: sticky; top: calc(var(--nav-height) + env(safe-area-inset-top)); height: calc(100svh - var(--nav-height) - env(safe-area-inset-top)); min-height: 650px; overflow: hidden; background: var(--sky); }
	.scene-art { position: absolute; inset: 0; pointer-events: none; }
	.landscape { width: 100%; height: 100%; display: block; }
	.scene-content { position: relative; width: min(1200px, 100%); margin: auto; height: 100%; padding: 0 3rem; }
	.scene-topline, .scene-bottomline { position: absolute; left: 3rem; right: 3rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; color: #b9bea9; font: 0.65rem var(--font-mono); letter-spacing: 0.09em; }
	.scene-topline { top: 1.7rem; }
	.scene-bottomline { bottom: 1.6rem; letter-spacing: 0; }
	.intro { position: absolute; top: 15%; left: 3rem; max-width: 55%; }
	.greeting { color: var(--sand); font: 0.8rem var(--font-mono); margin-bottom: 1.3rem; }
	.pixel-logo { display: block; width: clamp(210px, 26vw, 350px); margin-bottom: 1.5rem; }
	.pixel-logo svg { width: 100%; display: block; overflow: visible; }
	.logo-pixel { fill: var(--leaf); animation: phosphor 6s steps(1) infinite; animation-delay: var(--delay); }
	h1 { font-size: clamp(1.8rem, 3.5vw, 3.2rem); letter-spacing: -0.055em; color: var(--cream); margin-bottom: 1rem; }
	h1 span { color: var(--leaf); }
	.bio { color: #bec2ae; font-size: clamp(0.9rem, 1.3vw, 1rem); line-height: 1.8; }
	.bio a { color: var(--cream); }
	.intro-links { display: flex; gap: 1.8rem; margin-top: 1.5rem; font: 0.75rem var(--font-mono); }
	.intro-links a { color: var(--leaf); padding-block: 0.6rem; border-bottom: 1px solid #4a583c; }
	.intro-links a:hover { color: var(--cream); border-color: var(--cream); }
	.flight-caption { position: absolute; bottom: 14%; left: 3rem; max-width: 42%; }
	.chapter { color: var(--sand); font: 0.6rem var(--font-mono); letter-spacing: 0.13em; }
	.flight-caption p { color: var(--cream); font-size: 1.3rem; margin: 0.2rem 0; letter-spacing: -0.03em; }
	.note { color: #b9bea9; font: 0.7rem/1.7 var(--font-mono); }
	.scene-actions { display: flex; align-items: center; gap: 1.6rem; }
	.scene-actions a, button { color: var(--cream); font: 0.65rem var(--font-mono); padding: 0.65rem 0; }
	button { border: 0; background: none; cursor: pointer; }
	.scene-actions a:hover, button:hover { color: var(--leaf); }
	.scroll-cue { display: flex; align-items: center; gap: 0.7rem; color: var(--leaf); }
	.flight-track { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #343d2e; }
	.flight-track span { display: block; width: 100%; height: 100%; background: var(--leaf); transform-origin: left; }
	.star { animation: twinkle 5s steps(1) infinite; animation-delay: var(--delay); }
	.beacon { animation: twinkle 2s steps(1) infinite; }
	.exhaust { transform-box: fill-box; transform-origin: top center; animation: burn 0.3s steps(2, end) infinite; }
	.smoke { animation: vent 2s steps(6) infinite; animation-delay: var(--delay); }
	.journey:not(.ready) *, .still *, .asleep * { animation-play-state: paused !important; }
	@keyframes phosphor { 0%, 88%, 100% { fill: var(--leaf); } 90%, 94% { fill: var(--sand); } 96% { fill: var(--cream); } }
	@keyframes twinkle { 0%, 75%, 100% { opacity: 0.8; } 40% { opacity: 0.3; } }
	@keyframes burn { from { transform: scaleY(0.78); } to { transform: scaleY(1.15); } }
	@keyframes vent { from { transform: translate(0, 0); opacity: 0.8; } to { transform: translate(var(--drift), -12px); opacity: 0.2; } }
	:global([data-theme='light']) .journey { --sky: #e9e7d6; --leaf: #527b39; --leaf-dark: #496538; --sand: #876536; --cream: #2a3824; --moon: #c7b88c; --moon-shade: #ae9c70; --cloud: #ccd0b6; --smoke: #a3af91; --mountain-far: #c5c9ac; --mountain-lit: #d6d4b7; --mountain-near: #a5b38b; --ground: #c1c7a6; --terrain-detail: #8c9d75; --gantry: #7d896b; }
	:global([data-theme='light']) .bio, :global([data-theme='light']) .scene-topline, :global([data-theme='light']) .note { color: #536046; }
	@media (min-width: 1600px) { .landscape { width: 1600px; position: absolute; left: 50%; transform: translateX(-50%); } }
	@media (max-width: 700px) {
		.stage { min-height: 720px; }
		.journey.ready:not(.reduced) { height: 280svh; }
		.scene-content { padding-inline: 1.5rem; }
		.scene-topline, .scene-bottomline { left: 1.5rem; right: 1.5rem; }
		.scene-topline { font-size: 0.55rem; }
		.edition { display: none; }
		.intro { top: 10%; left: 1.5rem; max-width: calc(100% - 3rem); }
		.pixel-logo { width: 195px; margin-bottom: 1rem; }
		.greeting { margin-bottom: 1rem; font-size: 0.7rem; }
		h1 { font-size: 2rem; }
		.bio { font-size: 0.85rem; }
		.intro-links { margin-top: 0.75rem; gap: 1.2rem; font-size: 0.7rem; }
		.landscape { width: 700px; max-width: none; height: 455px; position: absolute; right: -150px; bottom: 0; }
		.flight-caption { left: 1.5rem; bottom: 15%; max-width: 43%; }
		.flight-caption p { font-size: 1.1rem; line-height: 1.3; }
		.note { display: none; }
		.chapter { font-size: 0.5rem; }
		.scene-bottomline { bottom: 1rem; align-items: start; font-size: 0.6rem; }
		.scene-actions { align-items: end; flex-direction: column; gap: 0; }
		.scene-actions a, button { font-size: 0.6rem; padding-block: 0.4rem; }
		.scroll-cue { padding-block: 0.4rem; }
	}
	@media (max-height: 740px) {
		.stage { min-height: 500px; }
		.intro { top: 11%; }
		.pixel-logo { width: 160px; margin-bottom: 0.8rem; }
		.greeting { font-size: 0.65rem; margin-bottom: 0.8rem; }
		h1 { font-size: 1.7rem; margin-bottom: 0.6rem; }
		.bio { font-size: 0.8rem; }
		.intro-links { margin-top: 0.5rem; }
		.flight-caption { bottom: 15%; }
		.note { display: none; }
	}
	@media (max-width: 360px) {
		.bio { max-width: 210px; font-size: 0.75rem; }
		.intro-links { gap: 1rem; font-size: 0.65rem; }
	}
	@media (prefers-reduced-motion: reduce) { .journey.ready:not(.reduced) { height: auto; } .journey * { animation: none !important; } }
</style>
