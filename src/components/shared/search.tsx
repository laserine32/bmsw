"use client";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const Search = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<>
			<form className="flex bg-background border text-foreground rounded-md shadow text-sm">
				<div aria-disabled="true" className="w-10 grid place-content-center">
					<MagnifyingGlassIcon className="w-4 h-4 text-foreground" />
				</div>
				<input
					type="search"
					spellCheck="false"
					name="text"
					className="bg-transparent py-1.5 pr-2 outline-none placeholder:text-zinc-400 w-20 focus:w-48 transition-all"
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams.get("query")?.toString()}
				/>
			</form>
		</>
	);
};

export const SearchMobile = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const term = searchValue;
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<>
			<form className="flex bg-background border text-foreground rounded-md shadow text-sm" onSubmit={handleSearch}>
				<div aria-disabled="true" className="w-10 grid place-content-center">
					<MagnifyingGlassIcon className="w-4 h-4 text-foreground" />
				</div>
				<input
					type="search"
					spellCheck="false"
					name="search"
					id="search"
					className="bg-transparent py-1.5 pr-2 outline-none placeholder:text-zinc-400 w-20 focus:w-48 transition-all"
					placeholder="Search..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</form>
		</>
	);
};
