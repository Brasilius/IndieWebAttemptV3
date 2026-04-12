<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="author" content="Leo" />

	<!-- Open Graph defaults (overridden per-page via <svelte:head> in child routes) -->
	<meta property="og:site_name" content="Niels Leo Larsen" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://nielslarsen.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Hi, I'm Leo — aerospace engineer · computer enthusiast" />

	<!-- Twitter / X Card (also used by iMessage on some iOS versions) -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://nielslarsen.dev/og-image.png" />
</svelte:head>

<Nav />
<main>
	{@render children()}
</main>
<Footer />
