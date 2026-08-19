import { getTags } from '$lib/server/db/query/tag';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Tags',
		streamed: {
			tagsPromise: getTags()
		}
	};
};
