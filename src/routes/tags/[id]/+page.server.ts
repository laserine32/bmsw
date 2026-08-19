import {
	getTag,
	getTagBookmarkSearchPagin,
	getTagBookmarkTotalPage
} from '$lib/server/db/query/tag';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const id = params.id;
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const tag = await getTag(id);
	return {
		title: tag.tag,
		streamed: {
			bookmarkPromise: getTagBookmarkSearchPagin(id, query, currentPage),
			totalPagePromise: getTagBookmarkTotalPage(id, query)
		}
	};
};
