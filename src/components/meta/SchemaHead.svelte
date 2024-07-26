<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';

	export let blog: ISafeBlogAuthor;

	const schema: Object = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: blog.Title,
		description: blog.Summary,
		datePublished: blog.PublishedAt,
		dateModified: blog.UpdatedAt,
		author: {
			'@type': 'Person',
			name: blog.Author.Username
		},
		publisher: {
			'@type': 'Organization',
			name: 'Resqiar.com',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.resqiar.com/main-logo.webp',
				width: 700,
				height: 190
			}
		},
		image: {
			'@type': 'ImageObject',
			url: blog.CoverURL,
			width: 900,
			height: 500
		}
	};

	const formatted: string = `<script type="application/ld+json">${JSON.stringify(
		schema
	)}<\/script>`;
</script>

<svelte:head>
	<meta name="author" content={blog.Author.Username} />
	<meta name="publish_date" property="og:publish_date" content={blog.PublishedAt} />

	{@html formatted}
</svelte:head>
