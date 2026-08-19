import type { RequestHandler } from './$types';
import { getMSPHImage } from '$lib/server/db/query/msvph';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	const gambardb = await getMSPHImage(id);
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
