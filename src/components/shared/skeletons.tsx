import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CardSkeleton = () => {
	return (
		<Card className="pt-0">
			<CardHeader className="pb-2 space-y-0 space-x-3 pt-0 px-0">
				{/* <Skeleton className="w-full h-40" /> */}
				<div
					data-slot="skeleton"
					className="animate-pulse rounded-md bg-muted w-full h-40 flex justify-center items-center"
				>
					<svg
						viewBox="0 0 16 20"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						className="h-10 w-10 text-gray-200 dark:text-gray-600"
					>
						<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
						<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
					</svg>
				</div>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-8 w-full mb-2" />
				<Skeleton className="h-4 w-full" />
			</CardContent>
		</Card>
	);
};

export const CardsSkeleton = () => {
	return (
		<>
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</>
	);
};

export const TableItemsSkeleton = () => {
	const data: Array<number> = [...Array(5).keys()];
	return (
		<table className="w-full text-sm text-left text-gray-500">
			<thead className="text-sm text-gray-700 uppercase bg-gray-50">
				<tr>
					<th className="py-3 px-6">#</th>
					<th className="py-3 px-6">Name</th>
					<th className="py-3 px-6">Unit</th>
					<th className="py-3 px-6">Price</th>
					<th className="py-3 px-6 text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index} className="bg-white border-b">
						<td className="py-3 px-6">
							<Skeleton className="h-6 w-16" />
						</td>
						<td className="py-3 px-6">
							<Skeleton className="h-6 w-16" />
						</td>
						<td className="py-3 px-6">
							<Skeleton className="h-6 w-16" />
						</td>
						<td className="py-3 px-6">
							<Skeleton className="h-6 w-16" />
						</td>
						<td className="flex justify-center gap-1 py-3">
							<Skeleton className="h-6 w-16" />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export const TableSkeleton = ({ header }: { header: Array<string> }) => {
	const data: Array<number> = [...Array(5).keys()];
	return (
		<table className="w-full text-sm text-left text-gray-500">
			<thead className="text-sm text-gray-700 uppercase bg-gray-50">
				<tr>
					{header.map((item, index) => {
						if (item.toLowerCase() == "actions")
							return (
								<th key={index} className="py-3 px-6 text-center">
									Actions
								</th>
							);
						return (
							<th key={index} className="py-3 px-6">
								{item}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index} className="bg-white border-b">
						{header.map((item, index) => (
							<td key={index} className="py-3 px-6">
								<Skeleton className="h-6 w-16" />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export const TransactionDetailSkelecton = ({ header }: { header: Array<string> }) => {
	const data: Array<number> = [...Array(5).keys()];
	return (
		<>
			<div className="flex items-center justify-start gap-1 mb-5">
				<h3>Date :</h3>
				<Skeleton className="h-5 w-40" />
			</div>
			<table className="w-full text-sm text-left">
				<thead className="text-sm uppercase">
					<tr>
						{header.map((item, index) => {
							return (
								<th className="p-2 md:py-3 md:px-6" key={index}>
									{item}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index} className="bg-white border-b">
							{header.map((item, index) => (
								<td key={index} className="p-2 md:py-3 md:px-6">
									<Skeleton className={cn("h-6", item === "#" ? "w-6" : "w-16")} />
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={header.length - 1} className="p-2 md:py-3 md:px-6">
							TOTAL
						</th>
						<td className="p-2 md:py-3 md:px-6">
							<Skeleton className="h-6 w-16" />
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
};
