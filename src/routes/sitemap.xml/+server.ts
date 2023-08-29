import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function GET({ fetch }: ServerLoadEvent) {
	try {
		const [blogReq, userReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/blog/list/slug`),
			fetch(`${PUBLIC_SERVER_URL}/user/list/username`)
		]);

		if (blogReq.status === "rejected" || userReq.status === "rejected") return;

		const users = await userReq.value.json();
		const blogs = await blogReq.value.json();

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://resqiar.com</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>

        <url>
            <loc>https://resqiar.com/blog</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>

        ${users.result
				.map((username: string) => {
					return `
                <url>
                    <loc>https://resqiar.com/${username}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
                </url>`;
				})
				.join('')}

        ${blogs.result
				.map((data: { AuthorUsername: string; Slug: string; UpdatedAt: string }) => {
					return `
                <url>
                    <loc>https://resqiar.com/blog/${data.AuthorUsername}/${data.Slug}</loc>
                    <changefreq>daily</changefreq>
                    <lastmod>${data.UpdatedAt}</lastmod>
                    <priority>0.9</priority>
                </url>`;
				})
				.join('')}
    </urlset>`;

		return new Response(xml, {
			headers: {
				'Cache-Control': 'max-age=0, s-maxage=3600',
				'Content-Type': 'application/xml'
			}
		});
	} catch (error) {
		console.error(error);
	}
}
