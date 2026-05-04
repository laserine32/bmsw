import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
	return (
		<>
			<main className="p-4 md:p-8">
				<h2 className="text-center text-[10rem] font-black">404</h2>
				<h1 className="text-center text-3xl font-bold">Nothing to see here</h1>
				<p className="text-center my-4">
					{`Page you are trying to open doesn't exist. You may have mustyped the address, or the page has been moved
							to another URL.`}
				</p>
				<div className="flex items-center justify-center">
					<Button asChild>
						<Link href={"/"}>Back to Dashborad</Link>
					</Button>
				</div>
			</main>
		</>
	);
};

export default NotFound;
