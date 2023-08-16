export const GET = async (): Promise<Response> => {
	const headers: Record<string, string> = {
		'Cache-Control': 'max-age=3600',
		'Content-Type': 'application/xml'
	};

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        >
            <url>
                <loc>https://stardb.gg/</loc>
                <lastmod>2023-08-16T07:47:01+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://stardb.gg/login</loc>
                <lastmod>2023-08-16T07:47:01+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://stardb.gg/register</loc>
                <lastmod>2023-08-16T07:47:02+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://stardb.gg/leaderboard</loc>
                <lastmod>2023-08-16T07:47:02+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://stardb.gg/achievement-tracker</loc>
                <lastmod>2023-08-16T07:47:02+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://stardb.gg/privacy-policy</loc>
                <lastmod>2023-08-16T07:47:03+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/</loc>
                <lastmod>2023-08-16T02:46:35+00:00</lastmod>
                <priority>1.00</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/daily-farm-route/</loc>
                <lastmod>2023-08-16T03:01:46+00:00</lastmod>
                <priority>0.80</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/free-stellar-jade-alerts/</loc>
                <lastmod>2023-08-15T20:35:00+00:00</lastmod>
                <priority>0.80</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price/</loc>
                <lastmod>2023-08-16T01:33:00+00:00</lastmod>
                <priority>0.80</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-australia/</loc>
                <lastmod>2023-08-15T20:35:03+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-brazil/</loc>
                <lastmod>2023-08-15T20:35:04+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-canada/</loc>
                <lastmod>2023-08-15T20:35:04+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-china/</loc>
                <lastmod>2023-08-15T20:35:05+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-eu/</loc>
                <lastmod>2023-08-15T20:35:06+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-india/</loc>
                <lastmod>2023-08-15T20:35:07+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-indonesia/</loc>
                <lastmod>2023-08-15T20:35:07+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-japan/</loc>
                <lastmod>2023-08-15T20:35:08+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-kazakhstan/</loc>
                <lastmod>2023-08-15T20:35:09+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-korea/</loc>
                <lastmod>2023-08-15T20:35:09+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-malaysia/</loc>
                <lastmod>2023-08-15T20:35:10+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-mexico/</loc>
                <lastmod>2023-08-15T20:35:11+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-paraguay/</loc>
                <lastmod>2023-08-15T20:35:11+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-phillipines/</loc>
                <lastmod>2023-08-15T20:35:12+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-russia/</loc>
                <lastmod>2023-08-15T20:35:13+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-singapore/</loc>
                <lastmod>2023-08-15T20:35:14+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-taiwan/</loc>
                <lastmod>2023-08-15T20:35:14+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-thailand/</loc>
                <lastmod>2023-08-15T20:35:02+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-uk/</loc>
                <lastmod>2023-08-15T20:35:15+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-us/</loc>
                <lastmod>2023-08-15T20:35:16+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/articles/oneiric-shard-price-vietnam/</loc>
                <lastmod>2023-08-15T20:35:01+00:00</lastmod>
                <priority>0.64</priority>
            </url>
            <url>
                <loc>https://stardb.gg/api/help/</loc>
                <lastmod>2023-08-16T07:47:02+01:00</lastmod>
                <priority>0.64</priority>
            </url>
        </urlset>`.trim(),
		{ headers: headers }
	);
};

export const prerender = true;

// const url = 'https://stardb.gg';

// const staticPages = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
// 	.filter((page) => !['/src/routes/+page.svelte'].find((filter) => page.includes(filter)))
// 	.map((page) => page.replace('/src/routes', url).replace('/+page.svelte', ''));

// <url>
// <loc>${url}</loc>
// <changefreq>weekly</changefreq>
// <priority>1.0</priority>
// <lastmod>${`${process.env.VITE_BUILD_TIME}`}</lastmod>
// </url>
// ${staticPages
//         .map(
//             (url: string) => `<url>
// <loc>${url}</loc>
// <changefreq>daily</changefreq>
// <priority>0.7</priority>
// <lastmod>${`${process.env.VITE_BUILD_TIME}`}</lastmod>
// </url>`
//         )
//         .join('')}
