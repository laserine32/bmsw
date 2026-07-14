import BookmarkCard from "@/components/shared/bookmark-card";
import { FilterOnlinePage } from "@/components/shared/online-site-filter";
import Pagination from "@/components/shared/pagination";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { getMsvphSearchPagin, getMsvphTotalPage } from "@/server/msvph";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 3600;

type SearchParams = Promise<{ query?: string; page?: string | number }>;

export const generateMetadata = () => {
	return {
		title: `Online`,
	};
};

const OnlinePage = ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<>
			<div className="flex justify-between items-center gap-4">
				<h1 className="text-2xl font-bold">MSVPH</h1>
				<Button asChild>
					<Link href={`online/random`}>Random</Link>
				</Button>
			</div>
			<div className="m-2">
				<Suspense>
					<FilterOnlinePage />
				</Suspense>
			</div>
			<div className="my-8 grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-6">
				<Suspense fallback={<CardsSkeleton />}>
					<MainOnlinePage searchParams={searchParams} />
				</Suspense>
			</div>
			<div className="flex justify-center mb-28">
				<MainOnlinePagination searchParams={searchParams} />
			</div>
		</>
	);
};

const MainOnlinePage = async ({ searchParams }: { searchParams: SearchParams }) => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const currentPage = Number(csp?.page) || 1;
	const data = await getMsvphSearchPagin(query, currentPage);
	return (
		<>
			<BookmarkCard data={data} />
		</>
	);
};

const MainOnlinePagination = async ({ searchParams }: { searchParams: SearchParams }) => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const totalPage = await getMsvphTotalPage(query);
	return (
		<>
			<Pagination totalPages={totalPage} />
		</>
	);
};

export default OnlinePage;
