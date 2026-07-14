import BookmarkCard from "@/components/shared/bookmark-card";
import { FilterOnlinePage } from "@/components/shared/online-site-filter";
import Pagination from "@/components/shared/pagination";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { urlSafeBase64Decode } from "@/lib/utils";
import { getTagMsvphSearchPagin, getTagMsvphTotalPage } from "@/server/msvph";
import { Suspense } from "react";

export const revalidate = 3600;

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const data = urlSafeBase64Decode(id);
	const title = data;
	return {
		title: `${title}`,
	};
};

type TagsPageIdProps = {
	params: Promise<{ id: string | number }>;
	searchParams?: Promise<{ query?: string; page?: string | number }>;
};

const OnlineTagPage = ({ params, searchParams }: TagsPageIdProps) => {
	return (
		<>
			<div className="flex justify-between items-center gap-4">
				<Suspense fallback={<h1 className="text-2xl font-bold"></h1>}>
					<PageTitle params={params} />
				</Suspense>
			</div>
			<div className="m-2">
				<Suspense>
					<FilterOnlinePage />
				</Suspense>
			</div>
			<div className="my-8 grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-6">
				<Suspense fallback={<CardsSkeleton />}>
					<TagOnlinePage params={params} searchParams={searchParams} />
				</Suspense>
			</div>
			<div className="flex justify-center mb-28">
				<TagOnlinePagination params={params} />
			</div>
		</>
	);
};

const PageTitle = async ({ params }: TagsPageIdProps) => {
	const { id } = await params;
	const tag = urlSafeBase64Decode(`${id}`);
	return (
		<>
			<h1 className="text-2xl font-bold">{tag}</h1>
		</>
	);
};

const TagOnlinePage = async ({ params, searchParams }: TagsPageIdProps) => {
	const { id } = await params;
	const csp = await searchParams;
	const tag = urlSafeBase64Decode(`${id}`);
	const currentPage = Number(csp?.page) || 1;
	const data = await getTagMsvphSearchPagin(tag, currentPage);
	return (
		<>
			<BookmarkCard data={data} />
		</>
	);
};

const TagOnlinePagination = async ({ params }: TagsPageIdProps) => {
	const { id } = await params;
	const tag = urlSafeBase64Decode(`${id}`);
	const totalPage = await getTagMsvphTotalPage(tag);
	return (
		<>
			<Pagination totalPages={totalPage} />
		</>
	);
};

export default OnlineTagPage;
