import BookmarkCard from "@/components/shared/bookmark-card";
import Pagination from "@/components/shared/pagination";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { getBookmarkSearchPagin, getBookmarkTotalPage } from "@/server/bookmark";
import { Suspense } from "react";

export const revalidate = 3600;

type SearchParams = Promise<{ query?: string; page?: string | number }>;

const MainPage = ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<h1 className="text-2xl font-bold">All Bookmark</h1>
			</div>
			<div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense fallback={<CardsSkeleton />}>
					<Main searchParams={searchParams} />
				</Suspense>
			</div>
			<Suspense>
				<PaginationMain searchParams={searchParams} />
			</Suspense>
		</>
	);
};

const Main = async ({ searchParams }: { searchParams: SearchParams }) => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const currentPage = Number(csp?.page) || 1;
	const data = await getBookmarkSearchPagin(query, currentPage);
	return (
		<>
			<BookmarkCard data={data} />
		</>
	);
};

const PaginationMain = async ({ searchParams }: { searchParams: SearchParams }) => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const totalPage = await getBookmarkTotalPage(query);
	return (
		<>
			<div className="flex justify-center my-28">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	);
};

export default MainPage;
