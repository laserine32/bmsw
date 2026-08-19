import { getRandomMsvph } from '$lib/server/db/query/msvph';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Online',
		streamed: {
			bookmarkPromise: getRandomMsvph()
		}
	};
};
