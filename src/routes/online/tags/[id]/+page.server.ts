import { getTagMsvphTotalPage } from '$lib/server/db/query/msvph';
import { getSiteName } from '$lib/server/db/query/msvph';
import { getTagMsvphSearchPagin } from '$lib/server/db/query/msvph';
import { urlSafeBase64Decode } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const id = params.id;
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const tag = urlSafeBase64Decode(id);
	return {
		title: tag,
		streamed: {
			bookmarkPromise: getTagMsvphSearchPagin(tag, currentPage),
			totalPagePromise: getTagMsvphTotalPage(tag),
			siteNamePromise: getSiteName()
		}
	};
};
