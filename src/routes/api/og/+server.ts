import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { extractOG } from '$lib/og';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { url } = await request.json();
		if (!url) {
			return json({ error: 'URL is required' }, { status: 400 });
		}
		const data = await extractOG(url);
		return json(data);
	} catch (err) {
		return json({ error: `Failed to fetch Open Graph data. ${err}` }, { status: 500 });
	}
};
