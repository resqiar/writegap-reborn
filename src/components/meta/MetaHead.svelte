<script lang="ts">
	export let title: string;
	export let description: string = '';
	export let imageURL: string = '';
	export let url: string = '';

	const DEFAULT_TITLE: string = 'Resqiar.com';
	const DEFAULT_DESC: string =
		'Join me on this exciting journey of personal growth. Immerse in insightful articles, inspiring showcases, and unleash your creativity in an interactive playground.';
	const DEFAULT_URL: string = 'https://resqiar.com';
</script>

<svelte:head>
	<title>{title ? title : DEFAULT_TITLE}</title>
	<meta name="description" content={description ? description : DEFAULT_DESC} />
	<meta name="image" content={imageURL ? imageURL : '/squarelogo.png'} />

	<meta itemProp="name" content={title ? title : DEFAULT_TITLE} />
	<meta itemProp="description" content={description ? description : DEFAULT_DESC} />
	<meta itemProp="image" content={imageURL ? imageURL : '/squarelogo.png'} />

	<!-- TWITTER -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title ? title : DEFAULT_TITLE} />
	<meta name="twitter:description" content={description ? description : DEFAULT_DESC} />
	<meta name="twitter:image:src" content={imageURL ? imageURL : '/squarelogo-twitter.png'} />

	<!-- OG GENERAL -->
	<meta name="og:title" content={title ? title : DEFAULT_TITLE} />
	<meta name="og:description" content={description ? description : DEFAULT_DESC} />
	<meta name="og:image" content={imageURL ? imageURL : '/squarelogo-fb.png'} />
	<meta name="og:url" content={url ? url : DEFAULT_URL} />
	<meta name="og:site_name" content="Resqiar" />
	<meta name="og:type" content="website" />

	<!-- ICON & MANIFEST -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

	<!-- THEME -->
	<meta name="msapplication-TileColor" content="#b91d47" />
	<meta name="theme-color" content="#ffffff" />
	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>
