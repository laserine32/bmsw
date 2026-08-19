import type { RequestHandler } from './$types';
import { getBookmarkImage } from '$lib/server/db/query/bookmark';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	const gambardb = await getBookmarkImage(id);
	if (!gambardb) {
		return new Response('Not Found', {
			status: 404
		});
	}
	const buffer = Buffer.from(gambardb, 'base64');

	return new Response(buffer, {
		headers: {
			'Content-Type': 'image/jpeg',
			// cache browser
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
