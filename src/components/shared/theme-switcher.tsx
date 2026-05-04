import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
	const { setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="cursor-pointer size-8">
					<SunIcon className="w-4 h-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<MoonIcon className="absolute w-4 h-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeSwitcher;
