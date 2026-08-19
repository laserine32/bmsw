import { getBookmarkSearchPagin, getBookmarkTotalPage } from '$lib/server/db/query/bookmark';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	return {
		search_query: query,
		current_page: currentPage,
		streamed: {
			bookmarkPromise: getBookmarkSearchPagin(query, currentPage),
			totalPagePromise: getBookmarkTotalPage(query)
		}
	};
};
