import BookmarkCard from "@/components/shared/bookmark-card";
import OnlineForm from "@/components/shared/online-form";
import Pagination from "@/components/shared/pagination";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add</Button>
					</DialogTrigger>
					<DialogContent className="max-w-[80vw]! w-[80vw]!">
						<DialogHeader>
							<DialogTitle>Add Bookmark</DialogTitle>
							<DialogDescription>Add a new bookmark to the database.</DialogDescription>
						</DialogHeader>
						<OnlineForm />
					</DialogContent>
				</Dialog>
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
