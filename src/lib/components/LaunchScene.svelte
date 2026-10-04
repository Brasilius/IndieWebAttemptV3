<script lang="ts">
	import { onMount } from 'svelte';
	import PixelLogo from './PixelLogo.svelte';

	let journey: HTMLElement;
	let scene: HTMLDivElement;
	let flightArt: SVGSVGElement;
	let towerTravel = $state(630);
	let progress = $state(0);
	let reducedMotion = $state(false);
	let paused = $state(false);
	let pausedFlight = $state(0);
	let ready = $state(false);
	let visible = $state(true);
	const clamp = (value: number) => Math.min(1, Math.max(0, value));
	let still = $derived(reducedMotion || paused);
	let flight = $derived(reducedMotion ? 0 : paused ? pausedFlight : clamp((progress - 0.08) / 0.92));
	const ease = (value: number) => value * value * (3 - 2 * value);
	// Finish climbing, turn left, charge the drive, then jump at the end of the scroll.
	let ascent = $derived(clamp(flight / 0.82));
	let turn = $derived(ease(clamp((flight - 0.82) / 0.08)));
	let charge = $derived(clamp((flight - 0.9) / 0.04));
	let warp = $derived(clamp((flight - 0.94) / 0.055));
	let warpGlow = $derived(charge * (1 - warp));
	let rocketOpacity = $derived(1 - clamp((warp - 0.15) / 0.65));
	let stage = $derived(progress < 0.08 ? 0 : progress < 0.35 ? 1 : progress < 0.72 ? 2 : 3);
	const stages = ['On the launchpad', 'A little less Earth.', 'A little more possibility.', 'Keep looking up.'];
	const notes = ['Every good flight starts with a little curiosity.', 'From an idea on paper to something in the sky.', 'Hardware, software, and everything in between.', 'There’s always something else to figure out.'];

	const stars = Array.from({ length: 96 }, (_, i) => ({
		x: (i * 137 + 31) % 1000, y: (i * 73 + 17) % 570,
		size: i % 7 === 0 ? 3 : i % 3 === 0 ? 1 : 2,
		delay: -(i * 1.7) % 13, duration: 4 + (i % 6), layer: i % 3
	}));
	const starLayers = [0, 1, 2].map((layer) => stars.filter((star) => star.layer === layer));
	const meteors = [
		{ x: 760, y: 65, duration: 19, delay: -7 },
		{ x: 940, y: 225, duration: 27, delay: -18 },
		{ x: 610, y: 140, duration: 33, delay: -3 }
	];
	const warpStars = Array.from({ length: 14 }, (_, i) => ({
		x: 550 + (i * 83) % 450, y: 70 + (i * 47) % 390, length: 12 + (i % 4) * 8
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
			// Use the actual sticky geometry, including safe areas and Safari's toolbar.
			const sceneRect = scene.getBoundingClientRect();
			progress = clamp((sceneRect.top - rect.top) / Math.max(1, rect.height - sceneRect.height));
			// Terrain and tower use different SVG scales, but must descend at the same
			// speed in screen pixels so the launchpad stays attached to the ground.
			const vehicleScale = Math.min(flightArt.clientWidth / 230, flightArt.clientHeight / 500);
			if (vehicleScale > 0) towerTravel = (630 * scene.clientHeight / 650) / vehicleScale;
		};
		const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
		const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
		observer.observe(journey);
		const sizeObserver = new ResizeObserver(schedule);
		sizeObserver.observe(scene);
		sizeObserver.observe(journey);
		sizeObserver.observe(flightArt);
		preference.addEventListener('change', updatePreference);
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		update();
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			sizeObserver.disconnect();
			preference.removeEventListener('change', updatePreference);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});
</script>

<section class="journey" class:ready class:still class:reduced={reducedMotion} class:asleep={!visible} bind:this={journey} aria-label="Making things fly — a scroll-driven pixel rocket launch">
	<div class="stage" bind:this={scene} style={`--flight: ${flight}; --ignition: ${clamp(flight * 12)};`}>
		<div class="scene-art" aria-hidden="true">
			<svg class="landscape" viewBox="0 0 1000 650" preserveAspectRatio="none" shape-rendering="crispEdges">
				<rect width="1000" height="650" fill="var(--sky)" />
				{#each starLayers as layer, depth}
					<g class="stars" style={`opacity: ${0.4 + flight * 0.6}; transform: translateY(${Math.round(flight * (30 + depth * 35))}px)`}>
						<g class="star-drift" style={`--drift-x: ${8 + depth * 6}px; --drift-y: ${-4 - depth * 5}px; --duration: ${38 - depth * 7}s; --delay: ${-depth * 9}s`}>
							{#each layer as star}
								<g class="star" style={`--delay: ${star.delay}s; --duration: ${star.duration}s`}>
									<rect x={star.x} y={star.y} width={star.size} height={star.size} fill={depth === 0 ? 'var(--leaf)' : 'var(--sand)'} />
									{#if star.size === 3}<path d={`M${star.x - 3} ${star.y + 1}h9M${star.x + 1} ${star.y - 3}v9`} stroke="var(--sand)" />{/if}
								</g>
							{/each}
						</g>
					</g>
				{/each}
				<g style={`opacity: ${0.5 + flight * 0.5}`}>
					{#each meteors as meteor}
						<g transform={`translate(${meteor.x} ${meteor.y})`}>
							<g class="meteor" style={`--duration: ${meteor.duration}s; --delay: ${meteor.delay}s`}>
								<path d="M0 0h4v4H0z" fill="var(--sand)" />
								<path d="M5 -3h5v3H5zM11 -6h5v3h-5z" fill="var(--sand)" opacity="0.55" />
								<path d="M17 -9h5v3h-5zM23 -12h4v3h-4z" fill="var(--sand)" opacity="0.2" />
							</g>
						</g>
					{/each}
				</g>
				<!-- Short horizontal star trails accompany the jump, behind all UI panels. -->
				<g opacity={Math.sin(warp * Math.PI) * 0.65} fill="var(--light)">
					{#each warpStars as star}
						<rect x={star.x + warp * 140} y={star.y} width={star.length + warp * 100} height="2" />
					{/each}
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

				</g>

			</svg>
			<!-- Independent square viewports keep the Destiny cameos on the pixel grid. -->
			<svg class="traveler-art" viewBox="-8 -8 104 104" preserveAspectRatio="xMidYMid meet" shape-rendering="crispEdges" style={`transform: translateY(${Math.round(flight * 95)}px)`}>
				<g class="traveler-halo" fill="none" stroke="var(--light)">
					<path d="M24 -5h40v8h19v16h10v50H83v16H64v8H24v-8H5V69H-5V19H5V3h19Z" />
				</g>
				<path d="M24 0h40v8h16v12h8v48h-8v12H64v8H24v-8H8V68H0V20h8V8h16Z" fill="var(--traveler-shell)" />
				<path d="M64 8h16v12h8v48h-8v12H64v8H24v-8H8V60h8v12h16v8h24v-8h12V60h8V28h-4V16H64Z" fill="var(--traveler-shade)" />
				<path d="M24 8h24v4H28v8H16v20h-4V20h12zM32 20h8v4h-8zM60 28h8v4h-8zM20 48h8v4h-8z" fill="var(--traveler-highlight)" />
				<!-- Weathered panels and the fractured underside distinguish the Traveler. -->
				<path d="M52 12v12h8v12h12M12 44h16v12h12M76 44H64v12h-8" fill="none" stroke="var(--traveler-seam)" stroke-width="2" />
				<path d="M32 64h8v-8h8v12h8v-8h8v8h8v8h-8v4H52v8H36v-8H24v-8h8Z" fill="var(--traveler-core)" />
				<path d="M36 64h4v8h8v4h-8v4h-4zM52 68h8v4h-4v8h-4z" fill="var(--traveler-seam)" />
				<path class="traveler-light" d="M44 64h4v8h-4zM56 72h4v4h-4zM32 72h4v4h-4z" fill="var(--light)" />
				<g class="traveler-fragments" fill="var(--traveler-shade)"><path d="M28 86h4v4h-4zM60 88h4v4h-4zM44 92h4v3h-4z" /></g>
			</svg>
			<div class="ghost-position" style={`transform: translateY(${Math.round(flight * 45)}px)`}>
				<svg class="ghost-art" viewBox="0 0 32 32" shape-rendering="crispEdges">
					<g class="ghost-shell">
						<path d="M14 1h4v4h4v5h5v4h4v4h-4v4h-5v5h-4v4h-4v-4h-4v-5H5v-4H1v-4h4v-4h5V5h4Z" fill="var(--traveler-core)" />
						<path d="M14 2h4v4h3v5h-7zM21 14h5v-3h-3V8h-4v6zM30 14v4h-4v3h-5v-7zM18 30h-4v-4h-3v-5h7zM2 18v-4h4v-3h5v7z" fill="var(--traveler-shell)" />
						<path d="M14 6h3v5h-3zM22 15h4v3h-4zM14 22h3v4h-3zM6 14h4v3H6z" fill="var(--traveler-shade)" />
					</g>
					<path d="M12 10h8v2h2v8h-2v2h-8v-2h-2v-8h2Z" fill="var(--traveler-shade)" />
					<path d="M13 12h6v1h1v6h-1v1h-6v-1h-1v-6h1Z" fill="var(--traveler-core)" />
					<path class="ghost-eye" d="M15 13h2v2h2v2h-2v2h-2v-2h-2v-2h2Z" fill="var(--light)" />
					<rect x="15" y="15" width="2" height="2" fill="var(--traveler-highlight)" />
				</svg>
			</div>
			<svg class="flight-art" bind:this={flightArt} viewBox="560 100 230 500" preserveAspectRatio="xMidYMax meet" shape-rendering="crispEdges">
				<g class="launch-tower" style={`transform: translateY(${Math.round(flight * towerTravel)}px)`}>
					<!-- Open steel launch gantry. -->
					<path d="M599 564V363h5v201M637 564V363h5v201M599 363h43v5h-43M599 400h43M599 440h43M599 480h43M599 520h43M604 368l33 32-33 40 33 40-33 40 33 39" fill="none" stroke="var(--gantry)" stroke-width="4" />
					<path d="M639 410h47v5h-47zM639 482h47v5h-47z" fill="var(--gantry)" />
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
				<g transform={`translate(${Math.round(ascent * 12)} ${Math.round(-ascent * 260)})`}>
					<!-- A local pixel flash and engine trail, rather than a screen-wide flash. -->
					<g transform="translate(1396 0) scale(-1 1)" opacity={warpGlow} fill="var(--light)">
						<path d="M780 444h4v-8h8v-4h12v4h8v8h4v56h-4v8h-8v4h-12v-4h-8v-8h-4v-16h4v16h8v4h12v-4h8v-56h-8v-4h-12v4h-8v16h-4Z" />
						<rect x={610 - charge * 50} y="469" width={80 + charge * 50} height="6" opacity="0.65" />
						<rect x={635 - charge * 35} y="459" width={48 + charge * 35} height="3" opacity="0.35" />
						<rect x={635 - charge * 35} y="482" width={48 + charge * 35} height="3" opacity="0.35" />
					</g>
					<g transform={`translate(${Math.round(-warp * warp * 800)} 0)`} opacity={rocketOpacity}>
					<g transform={`translate(698 472) scale(${1 + warp * 1.8} ${1 - warp * 0.85}) translate(-698 -472)`}>
					<g class="rocket" transform={`rotate(${-turn * 90} 698 472)`}>
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
					</g>
				</g>
			</svg>
		</div>

		<div class="scene-content">
			<div class="scene-topline"><span>NIELS LEO LARSEN<span class="descriptor"> / PERSONAL EXPLORATIONS</span></span><span class="edition">EST. ON EARTH</span></div>
			<div class="intro h-card">
				<p class="greeting">“Amaze, amaze, amaze!”</p>
				<a href="/about" class="pixel-logo" aria-label="Leo — more about me">
					<PixelLogo animated />
				</a>
				<h1>Making things fly<span>.</span></h1>
				<p class="bio p-note">I’m <a href="/about" class="p-name u-url">Niels Leo Larsen</a>.<br />Aerospace engineer by trade.<br />Computer enthusiast by passion.</p>
				<div class="intro-links"><a href="/about">Meet the engineer <span aria-hidden="true">↗</span></a><a href="https://github.com/brasilius" rel="me noopener" target="_blank">GitHub <span aria-hidden="true">↗</span></a></div>
			</div>
			<div class="flight-caption" aria-hidden="true"><span class="chapter">0{stage + 1} / FLIGHT NOTES</span><p>{flight >= 0.94 ? 'See you in hyperspace.' : flight >= 0.82 ? 'A 90° change of plans.' : stages[stage]}</p><span class="note">{flight >= 0.82 ? 'Some flights deserve a different ending.' : notes[stage]}</span></div>
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
	.journey { --sky: #11140f; --leaf: #9dc87a; --leaf-dark: #587346; --sand: #c8a96e; --cream: #e2d9c8; --rust: #b9784c; --traveler-shell: #e7e9e7; --traveler-highlight: #ffffff; --traveler-shade: #b9c3c7; --traveler-seam: #879799; --traveler-core: #3a494d; --light: #a6e5ed; --cloud: #343d2e; --smoke: #68715a; --mountain-far: #252e21; --mountain-lit: #343d2b; --mountain-near: #3b4931; --ground: #1b2419; --terrain-detail: #46533a; --gantry: #637153; position: relative; margin-top: -3rem; }
	.journey.ready:not(.reduced) { height: 300svh; }
	.stage { position: sticky; top: calc(var(--nav-height) + env(safe-area-inset-top)); height: calc(100dvh - var(--nav-height) - env(safe-area-inset-top)); min-height: 620px; overflow: hidden; background: var(--sky); --inset: clamp(1rem, 5vw, 7rem); --panel: #11180f; --copy: #d5dccb; --panel-border: #536247; }
	.scene-art { position: absolute; inset: 0; pointer-events: none; }
	/* Terrain fills the screen; the vehicle uses a separate, aspect-preserving viewport.
	   Its scale is the smaller fraction of the available width and height. */
	.traveler-art { position: absolute; top: 17%; right: 12%; width: min(clamp(48px, 9vw, 144px), 16svh); height: auto; aspect-ratio: 1; overflow: visible; }
	.ghost-position { position: absolute; top: 39%; right: 29%; width: clamp(22px, 2.5vw, 34px); }
	.ghost-art { display: block; width: 100%; height: auto; overflow: visible; animation: ghost-flight 14s ease-in-out infinite; }
	.ghost-shell { transform-box: view-box; transform-origin: center; animation: ghost-turn 14s ease-in-out infinite; }
	.ghost-eye { animation: light-pulse 4s ease-in-out infinite; }
	.traveler-halo { animation: halo-pulse 9s ease-in-out infinite; opacity: 0.12; }
	.traveler-light { animation: light-pulse 7s ease-in-out infinite; }
	.traveler-fragments { animation: fragments 8s steps(4) infinite alternate; }
	.landscape { width: 100%; height: 100%; display: block; }
	/* Only the outer stage clips departing scenery; this viewport is for scaling. */
	.flight-art { position: absolute; width: 34%; height: 84%; right: 8%; bottom: 9%; overflow: visible; }
	.scene-content { position: relative; width: 100%; height: 100%; }
	.scene-topline, .scene-bottomline { position: absolute; left: var(--inset); right: var(--inset); display: flex; justify-content: space-between; align-items: center; gap: 1rem; color: var(--copy); font: 0.75rem/1.5 var(--font-mono); }
	.scene-topline { top: 1rem; letter-spacing: 0.04em; }
	.scene-topline > span { background: var(--panel); padding: 0.4rem 0.6rem; }
	.scene-bottomline { bottom: 1rem; background: var(--panel); border: 1px solid var(--panel-border); padding: 0.25rem 1rem; }
	.intro { position: absolute; top: 12%; left: var(--inset); width: min(48%, 650px); padding: clamp(1rem, 2vw, 2rem); background: var(--panel); border-left: 2px solid var(--leaf); }
	.greeting { color: var(--sand); font: 0.85rem/1.5 var(--font-mono); margin-bottom: 1rem; }
	.pixel-logo { display: block; width: clamp(210px, 26vw, 350px); max-width: 100%; margin-bottom: 1.25rem; }
	h1 { font-size: clamp(1.5rem, 2.7vw, 2.6rem); letter-spacing: -0.05em; color: var(--cream); margin-bottom: 1rem; }
	h1 span { color: var(--leaf); }
	.bio { color: var(--copy); font-size: clamp(0.875rem, 1.15vw, 1.05rem); line-height: 1.8; }
	.bio a { color: var(--cream); }
	.intro-links { display: flex; flex-wrap: wrap; gap: 0.25rem 1.5rem; margin-top: 1rem; font: 0.8rem/1.5 var(--font-mono); }
	.intro-links a { color: var(--leaf); padding-block: 0.6rem; border-bottom: 1px solid var(--panel-border); }
	.intro-links a:hover { color: var(--cream); border-color: var(--cream); }
	.flight-caption { position: absolute; bottom: 13%; left: var(--inset); width: min(43%, 540px); padding: 1rem 1.25rem; background: var(--panel); border: 1px solid var(--panel-border); }
	.chapter { color: var(--sand); font: 0.75rem/1.5 var(--font-mono); letter-spacing: 0.06em; }
	.flight-caption p { color: var(--cream); font-size: 1.1rem; margin: 0.4rem 0; }
	.note { color: var(--copy); font: 0.8rem/1.7 var(--font-mono); }
	.scene-actions { display: flex; align-items: center; gap: 1.5rem; }
	.scene-actions a, button { color: var(--cream); font: 0.75rem/1.5 var(--font-mono); padding: 0.7rem 0; min-height: 44px; }
	button { border: 0; background: none; cursor: pointer; }
	.scene-actions a:hover, button:hover { color: var(--leaf); }
	.scroll-cue { display: flex; align-items: center; gap: 0.7rem; color: var(--leaf); }
	.flight-track { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--panel-border); }
	.flight-track span { display: block; width: 100%; height: 100%; background: var(--leaf); transform-origin: left; }
	.star { animation: twinkle var(--duration) steps(3, end) infinite; animation-delay: var(--delay); }
	.star-drift { animation: drift var(--duration) linear infinite alternate; animation-delay: var(--delay); }
	.meteor { opacity: 0; animation: shooting-star var(--duration) linear infinite; animation-delay: var(--delay); }
	.beacon { animation: twinkle 2s steps(1) infinite; }
	.exhaust { transform-box: fill-box; transform-origin: top center; animation: burn 0.3s steps(2, end) infinite; }
	.smoke { animation: vent 2s steps(6) infinite; animation-delay: var(--delay); }
	.journey:not(.ready), .still, .asleep { --logo-play-state: paused; }
	.journey:not(.ready) *, .still *, .asleep * { animation-play-state: paused !important; }
	@keyframes twinkle { 0%, 75%, 100% { opacity: 0.8; } 40% { opacity: 0.3; } }
	@keyframes drift { from { transform: translate(0, 0); } to { transform: translate(var(--drift-x), var(--drift-y)); } }
	@keyframes shooting-star {
		0%, 86% { opacity: 0; transform: translate(0, 0); }
		87% { opacity: 0.85; transform: translate(-8px, 4px); }
		93% { opacity: 0; transform: translate(-160px, 80px); }
		100% { opacity: 0; transform: translate(-160px, 80px); }
	}
	@keyframes ghost-flight {
		0%, 100% { transform: translate(0, 0) rotate(-5deg); }
		25% { transform: translate(-14px, -12px) rotate(4deg); }
		50% { transform: translate(8px, -20px) rotate(-3deg); }
		75% { transform: translate(18px, 3px) rotate(6deg); }
	}
	@keyframes ghost-turn { 0%, 35%, 65%, 100% { transform: rotate(0deg); } 48%, 52% { transform: rotate(90deg); } }
	@keyframes light-pulse { 0%, 100% { opacity: 0.65; } 50% { opacity: 1; } }
	@keyframes halo-pulse { 0%, 100% { opacity: 0.08; } 50% { opacity: 0.25; } }
	@keyframes fragments { from { transform: translateY(0); } to { transform: translateY(3px); } }
	@keyframes burn { from { transform: scaleY(0.78); } to { transform: scaleY(1.15); } }
	@keyframes vent { from { transform: translate(0, 0); opacity: 0.8; } to { transform: translate(var(--drift), -12px); opacity: 0.2; } }
	:global([data-theme='light']) .journey { --sky: #e9e7d6; --leaf: #527b39; --leaf-dark: #496538; --sand: #876536; --cream: #2a3824; --traveler-shell: #e7e9e7; --traveler-highlight: #ffffff; --traveler-shade: #b9c3c7; --traveler-seam: #879799; --traveler-core: #3a494d; --light: #a6e5ed; --cloud: #ccd0b6; --smoke: #a3af91; --mountain-far: #c5c9ac; --mountain-lit: #d6d4b7; --mountain-near: #a5b38b; --ground: #c1c7a6; --terrain-detail: #8c9d75; --gantry: #7d896b; }
	:global([data-theme='light']) .stage { --panel: #f1f1e3; --copy: #38452f; --panel-border: #829371; }
	@media (max-width: 850px) {
		.stage { --inset: 1rem; min-height: 660px; }
		.scene-topline { font-size: 0.6875rem; }
		.edition { display: none; }
		.traveler-art { top: 49%; right: 9%; width: clamp(36px, 8vw, 64px); }
		.ghost-position { top: 57%; right: 31%; width: 22px; }
		.intro { top: 3.4rem; width: calc(100% - 2rem); padding: 1rem; }
		.pixel-logo { width: clamp(150px, 35vw, 220px); margin-bottom: 0.75rem; }
		.greeting { font-size: 0.75rem; margin-bottom: 0.75rem; }
		h1 { font-size: clamp(1.25rem, 4vw, 1.8rem); margin-bottom: 0.6rem; }
		.bio { font-size: 0.8125rem; line-height: 1.65; }
		.intro-links { margin-top: 0.5rem; font-size: 0.75rem; }
		.flight-art { width: 49%; height: 42%; right: 0; bottom: 12%; }
		.flight-caption { bottom: 17%; width: 47%; padding: 0.75rem; }
		.flight-caption p { font-size: 0.9375rem; }
		.chapter { font-size: 0.6875rem; }
		.note { display: none; }
		.scene-bottomline { bottom: 0.6rem; padding: 0.2rem 0.65rem; flex-wrap: wrap; gap: 0; font-size: 0.75rem; }
		.scene-actions { justify-content: space-between; flex: 1 1 100%; gap: 0.5rem; }
		.scroll-cue { padding-top: 0.2rem; }
	}
	@media (min-width: 851px) and (max-height: 950px) {
		.intro { top: 10%; padding: 1rem 1.25rem; }
		.pixel-logo { width: clamp(180px, 22vw, 260px); margin-bottom: 0.75rem; }
		.greeting { margin-bottom: 0.6rem; }
		h1 { font-size: clamp(1.4rem, 2.5vw, 2rem); margin-bottom: 0.6rem; }
		.bio { font-size: 0.875rem; }
		.intro-links { margin-top: 0.5rem; }
		.flight-caption { bottom: 13%; padding: 0.65rem 1rem; }
		.note { display: none; }
	}
	@media (max-width: 850px) and (max-height: 740px) {
		.stage { min-height: 0; }
		.pixel-logo { width: 95px; margin-bottom: 0.5rem; }
		.intro { padding: 0.75rem; }
		/* Keep the greeting visible even while the mobile browser toolbar is expanded. */
		.greeting { margin-bottom: 0.5rem; }
		.bio { font-size: 0.75rem; }
		.flight-art { height: 30%; bottom: 17%; }
		.flight-caption { bottom: 19%; padding: 0.6rem; }
		.chapter { font-size: 0.625rem; letter-spacing: 0; }
		.flight-caption p { font-size: 0.875rem; }
	}
	@media (max-width: 600px) { .descriptor { display: none; } }
	@media (max-height: 550px) { .stage { min-height: 590px; } }
	@media (prefers-reduced-motion: reduce) { .journey.ready:not(.reduced) { height: auto; } .journey * { animation: none !important; } }
</style>
