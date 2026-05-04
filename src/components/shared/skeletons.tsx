import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CardSkeleton = () => {
	return (
		<Card className="pt-0">
			<CardHeader className="pb-2 space-y-0 space-x-3 pt-0 px-0">
				<Skeleton className="w-full h-40" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-10 w-full" />
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
