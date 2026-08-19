import { getMsvphSearchPagin, getMsvphTotalPage, getSiteName } from '$lib/server/db/query/msvph';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	return {
		search_query: query,
		current_page: currentPage,
		title: 'Online',
		streamed: {
			bookmarkPromise: getMsvphSearchPagin(query, currentPage),
			totalPagePromise: getMsvphTotalPage(query),
			siteNamePromise: getSiteName()
		}
	};
};
