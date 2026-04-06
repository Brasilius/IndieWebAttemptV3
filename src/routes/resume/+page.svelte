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
			<a href="/resume.pdf" download class="btn">download PDF</a>
			<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
				open in new tab
			</a>
		</div>

		<div class="pdf-frame">
			<object
				data="/resume.pdf"
				type="application/pdf"
				width="100%"
				height="100%"
			>
				<p class="fallback">
					Your browser can't display PDFs inline.
					<a href="/resume.pdf" download>Download the PDF</a> instead.
				</p>
			</object>
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
		height: 80vh;
		min-height: 500px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--surface);
	}

	.pdf-frame iframe {
		border: none;
		display: block;
	}

	.fallback {
		padding: 2rem;
		color: var(--text-muted);
		text-align: center;
	}

	.fallback a {
		color: var(--accent);
	}
</style>
