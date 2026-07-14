import BookmarkCard from "@/components/shared/bookmark-card";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { getRandomMsvph } from "@/server/msvph";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 3600;

export const generateMetadata = () => {
	return {
		title: `Online`,
	};
};

const RandomPage = () => {
	return (
		<>
			<div className="flex justify-between items-center gap-4">
				<h1 className="text-2xl font-bold">MSVPH Random</h1>
				<Button asChild>
					<Link href={`/online`}>Normal</Link>
				</Button>
			</div>
			<div className="my-8 grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-6">
				<Suspense fallback={<CardsSkeleton />}>
					<MainOnlinePage />
				</Suspense>
			</div>
		</>
	);
};

const MainOnlinePage = async () => {
	const data = await getRandomMsvph();
	return (
		<>
			<BookmarkCard data={data} />
		</>
	);
};

export default RandomPage;
