import MainFallback from "@/components/shared/main-fallback";
import Navbar from "@/components/shared/navbar";
import ProgressBar from "@/components/shared/progress-bar";
import ScrollTop from "@/components/shared/scroll-top";
import { Toaster } from "@/components/ui/sonner";
import { getTags } from "@/server/tag";
import { Suspense } from "react";

const MainLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const dataTag = await getTags();
	const menu = [
		{ title: "Home", url: "/" },
		{
			title: "Tags",
			url: "#",
			items: dataTag.map((t) => ({
				title: t.tag,
				url: `/tags/${t.id}`,
			})),
		},
		{ title: "Add", url: "/add" },
	];
	return (
		<>
			<Navbar menu={menu} className="w-full bg-accent" />
			<Suspense fallback={<MainFallback />}>
				<div className="py-4 px-2 md:px-10">
					<ProgressBar />
					{children}
					<ScrollTop />
				</div>
			</Suspense>
			<Toaster />
		</>
	);
};

export default MainLayout;
