<script>
	import { onMount } from 'svelte';

	let isFirefoxIOS = false;
	let pdfContainer;
	let loading = true;
	let loadError = false;

	onMount(async () => {
		const ua = navigator.userAgent;
		isFirefoxIOS = /FxiOS/.test(ua);

		try {
			const pdfjsLib = await import('pdfjs-dist');
			pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
				'pdfjs-dist/build/pdf.worker.min.mjs',
				import.meta.url
			).href;

			const pdf = await pdfjsLib.getDocument('/resume.pdf').promise;
			const containerWidth = pdfContainer.clientWidth;

			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				const page = await pdf.getPage(pageNum);
				const unscaled = page.getViewport({ scale: 1 });
				const scale = containerWidth / unscaled.width;
				const viewport = page.getViewport({ scale });

				const canvas = document.createElement('canvas');
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				canvas.style.width = '100%';
				canvas.style.height = 'auto';
				canvas.style.display = 'block';
				if (pageNum > 1) canvas.style.marginTop = '1rem';

				pdfContainer.appendChild(canvas);
				await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
			}

			loading = false;
		} catch (e) {
			console.error('PDF load error:', e);
			loadError = true;
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Resume — Leo</title>
	<meta name="description" content="Leo's resume." />
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>Resume</h1>
		<p>Download or view my resume below.</p>
	</header>

	<div class="resume-wrap">
		<div class="toolbar">
			{#if isFirefoxIOS}
				<!-- Firefox iOS ignores the download attribute; open in new tab instead -->
				<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="btn">download PDF</a>
			{:else}
				<a href="/resume.pdf" download class="btn">download PDF</a>
			{/if}
			<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
				open in new tab
			</a>
		</div>

		<div class="pdf-frame">
			{#if loadError}
				<div class="pdf-status">
					Unable to load PDF inline.
					<a href="/resume.pdf" download>Download</a> or
					<a href="/resume.pdf" target="_blank" rel="noopener noreferrer">open in new tab</a>.
				</div>
			{/if}
			<div bind:this={pdfContainer} class="pdf-canvas-container"></div>
		</div>
	</div>
</div>

<style>
	.page-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.page-header h1 {
		font-size: 2.25rem;
		letter-spacing: -0.04em;
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: var(--text-muted);
		font-size: 1rem;
	}

	.resume-wrap {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.toolbar {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.btn {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		padding: 0.45rem 1rem;
		border-radius: var(--radius);
		text-decoration: none;
		transition: background var(--t), color var(--t), border-color var(--t);
		background: var(--accent);
		color: var(--bg);
		border: 1px solid var(--accent);
	}

	.btn:hover {
		opacity: 0.85;
	}

	.btn-ghost {
		background: transparent;
		color: var(--accent);
	}

	.btn-ghost:hover {
		background: var(--accent-glow);
		opacity: 1;
	}

	.pdf-frame {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--surface);
		padding: 1rem;
		box-sizing: border-box;
	}

	.pdf-status {
		padding: 2rem;
		color: var(--text-muted);
		text-align: center;
		font-size: 0.95rem;
	}

	.pdf-status a {
		color: var(--accent);
	}

	.pdf-canvas-container {
		width: 100%;
	}
</style>
