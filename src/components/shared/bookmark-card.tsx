import { BookmarkSearchPagin } from "@/server/bookmark";
import { Card, CardHeader } from "../ui/card";
import Link from "next/link";
import LazyImage from "./lazy-image";

const BookmarkCard = ({ data }: { data: BookmarkSearchPagin }) => {
	return (
		<>
			{data.map((d) => (
				<Card key={d.id} className="overflow-hidden py-0 gap-1 md:gap-2">
					<div className="aspect-video w-full overflow-hidden">
						<Link href={d.url} target="_blank" className="transition-opacity duration-200 fade-in hover:opacity-70">
							<LazyImage
								className="h-full w-full object-cover object-center"
								src={d.type === "ADT" ? `/api/image/${d.id}/online` : `/api/image/${d.id}`}
								fallbackSrc={d.imageUrl || ``}
								alt={d.imageUrl ?? `image`}
								width={200}
								height={200}
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
							/>
						</Link>
					</div>
					<CardHeader className="block px-1.5 md:px-2">
						<div className="w-full">
							<p className="mt-0 md:mt-2 text-xxs md:text-xs text-foreground/50 truncate">
								{d.siteName == `undefined` ? d.url : d.siteName}
							</p>
							<h4 className="text-xs hover:underline md:text-sm truncate">
								<Link href={d.url} target="_blank">
									{d.title}
								</Link>
							</h4>
							<p className="mb-2 text-xxs md:text-xs text-foreground/50 truncate">{d.description}</p>
						</div>
					</CardHeader>
				</Card>
			))}
		</>
	);
};

export default BookmarkCard;
// grid grid-rows-[auto_auto_1fr_auto]
