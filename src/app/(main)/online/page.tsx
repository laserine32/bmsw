import BookmarkCard from "@/components/shared/bookmark-card";
import Pagination from "@/components/shared/pagination";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { getMsvphSearchPagin, getMsvphTotalPage } from "@/server/msvph";
import { Suspense } from "react";

export const revalidate = 3600;

type SearchParams = Promise<{ query?: string; page?: string | number }>;

export const generateMetadata = () => {
	return {
		title: `Online`,
	};
};

const OnlinePage = async ({ searchParams }: { searchParams: SearchParams }) => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const currentPage = Number(csp?.page) || 1;
	const data = await getMsvphSearchPagin(query, currentPage);
	const totalPage = await getMsvphTotalPage(query);
	return (
		<>
			<div className="flex justify-between items-center gap-4">
				<h1 className="text-2xl font-bold">MSVPH</h1>
			</div>
			<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
					<BookmarkCard data={data} />
				</Suspense>
			</div>
			<div className="flex justify-center my-28">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	);
};

export default OnlinePage;
