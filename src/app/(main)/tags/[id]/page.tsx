import BookmarkCard from "@/components/shared/bookmark-card";
import Pagination from "@/components/shared/pagination";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { getTag, getTagBookmarkSearchPagin, getTagBookmarkTotalPage, getTags, TagType } from "@/server/tag";
import { Suspense } from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
	const all: TagType[] = await getTags();
	return all.map((item) => ({
		id: `${item.id}`,
	}));
}

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const data = await getTag(id);
	const title = data.tag;
	return {
		title: `${title}`,
	};
};

type TagsPageIdProps = {
	params: Promise<{ id: string | number }>;
	searchParams: Promise<{ query?: string; page?: string | number }>;
};

const TagsPage = async ({ params, searchParams }: TagsPageIdProps) => {
	const csp = await searchParams;
	const { id } = await params;
	const query = csp?.query || "";
	const currentPage = Number(csp?.page) || 1;
	const tag = await getTag(`${id}`);
	const data = await getTagBookmarkSearchPagin(`${id}`, query, currentPage);
	const totalPage = await getTagBookmarkTotalPage(`${id}`, query);
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<h1 className="text-2xl font-bold">{tag.tag}</h1>
			</div>
			<div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
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

export default TagsPage;
