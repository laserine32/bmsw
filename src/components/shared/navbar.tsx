"use client";
import { APP_NAME, SERVER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ListIcon } from "@phosphor-icons/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import ThemeSwitcher from "./theme-switcher";
import Search from "./search";

interface MenuItem {
	title: string;
	url: string;
	description?: string;
	icon?: React.ReactNode;
	items?: MenuItem[];
}

interface NavbarProps {
	className?: string;
	logo?: {
		url: string;
		src: string;
		alt: string;
		title: string;
		className?: string;
	};
	menu?: MenuItem[];
	auth?: {
		login: {
			title: string;
			url: string;
		};
		signup: {
			title: string;
			url: string;
		};
	};
}

const Navbar = ({
	logo = {
		url: SERVER_URL,
		src: "/icon1.png",
		alt: "logo",
		title: APP_NAME,
	},
	menu = [
		{ title: "Home", url: "/" },
		{ title: "Tags", url: "#" },
		{ title: "Adds", url: "#" },
	],
	className,
}: NavbarProps) => {
	return (
		<>
			<section className={cn("py-2", className)}>
				<div className="ms-0 me-0 ps-8 pe-8 w-full">
					{/* Desktop Menu */}
					<nav className="hidden items-center justify-between lg:flex">
						<div className="flex items-center gap-6">
							{/* Logo */}
							<Link href={logo.url} className="flex items-center gap-2">
								<Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
								<span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
							</Link>
							<div className="flex items-center">
								<NavigationMenu>
									<NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
								</NavigationMenu>
							</div>
						</div>
						<div className="flex gap-2">
							<Search />
							<ThemeSwitcher />
							{/* <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button> */}
						</div>
					</nav>
					{/* Mobile Menu */}
					<div className="block lg:hidden">
						<div className="flex items-center justify-between">
							{/* Logo */}
							<Link href={logo.url} className="flex items-center gap-2">
								<Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
							</Link>
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" size="icon">
										<ListIcon className="size-4" />
									</Button>
								</SheetTrigger>
								<SheetContent className="overflow-y-auto">
									<SheetHeader>
										<SheetTitle>
											<Link href={logo.url} className="flex items-center gap-2">
												<Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
											</Link>
										</SheetTitle>
									</SheetHeader>
									<div className="flex flex-col gap-6 p-4">
										<Accordion type="single" collapsible className="flex w-full flex-col gap-4">
											{menu.map((item) => renderMobileMenuItem(item))}
										</Accordion>
										<Search />
										<ThemeSwitcher />
										{/* <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div> */}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const renderMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<NavigationMenuItem key={item.title}>
				<NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md hover:bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground">
					{item.title}
				</NavigationMenuTrigger>
				<NavigationMenuContent className="bg-popover text-popover-foreground">
					{item.items.map((subItem) => (
						<NavigationMenuLink asChild key={subItem.title} className="w-80">
							<SubMenuLink item={subItem} />
						</NavigationMenuLink>
					))}
				</NavigationMenuContent>
			</NavigationMenuItem>
		);
	}
	return (
		<NavigationMenuItem key={item.title}>
			<NavigationMenuLink
				href={item.url}
				className="group inline-flex h-10 w-max items-center justify-center rounded-md hover:bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground"
			>
				{item.title}
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
};

const renderMobileMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<AccordionItem key={item.title} value={item.title} className="border-b-0">
				<AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">{item.title}</AccordionTrigger>
				<AccordionContent className="mt-2">
					{item.items.map((subItem) => (
						<SubMenuLink key={subItem.title} item={subItem} />
					))}
				</AccordionContent>
			</AccordionItem>
		);
	}

	return (
		<Link key={item.title} href={item.url} className="text-md font-semibold">
			{item.title}
		</Link>
	);
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
	return (
		<Link
			className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
			href={item.url}
		>
			<div className="text-foreground">{item.icon}</div>
			<div>
				<div className="text-sm font-semibold">{item.title}</div>
				{item.description && <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>}
			</div>
		</Link>
	);
};

export default Navbar;
