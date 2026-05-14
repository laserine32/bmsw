import { BookmarkSearchPagin } from "@/server/bookmark";
import { Card, CardHeader } from "../ui/card";
import Link from "next/link";
import LazyImage from "./lazy-image";

const BookmarkCard = ({ data }: { data: BookmarkSearchPagin }) => {
	return (
		<>
			{data.map((d) => (
				<Card key={d.id} className="overflow-hidden pt-0">
					<div className="aspect-video w-full overflow-hidden">
						<Link href={d.url} target="_blank" className="transition-opacity duration-200 fade-in hover:opacity-70">
							<LazyImage
								className="h-full w-full object-cover object-center"
								src={d.imageUrl}
								fallbackSrc={`data:image/jpeg;base64,${d.image}`}
								alt={d.imageUrl ?? `image`}
								width={200}
								height={200}
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
							/>
						</Link>
					</div>
					<CardHeader className="px-2 md:px-4">
						<div className="truncate">
							<p className="mt-2 text-sm text-foreground/50">{d.url}</p>
							<h4 className="text-xl hover:underline md:text-xl">
								<Link href={d.url} target="_blank">
									{d.title}
								</Link>
							</h4>
							<p className="mb-2 text-sm text-foreground/50">
								{d.siteName} · {d.description}
							</p>
						</div>
					</CardHeader>
				</Card>
			))}
		</>
	);
};

export default BookmarkCard;
// grid grid-rows-[auto_auto_1fr_auto]
