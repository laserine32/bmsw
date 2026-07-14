import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { urlSafeBase64Encode } from "@/lib/utils";
import { getSiteName } from "@/server/msvph";

export const OnlineSiteFilter = ({ data }: { data: Array<string | null> | null }) => {
	return (
		<>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="sitename">
					<AccordionTrigger className="bg-accent text-accent-foreground px-4 py-2">Site Name</AccordionTrigger>
					<AccordionContent className="bg-accent/50 p-2">
						<div className="flex gap-2 flex-wrap">
							{data?.map((e, i) => {
								if (e == null) {
									return;
								}
								const link = `/online/tags/${urlSafeBase64Encode(e)}`;
								return (
									<Button key={i} asChild>
										<Link href={link}>{e}</Link>
									</Button>
								);
							})}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export const FilterOnlinePage = async () => {
	const data = await getSiteName();
	return (
		<>
			<OnlineSiteFilter data={data} />
		</>
	);
};
