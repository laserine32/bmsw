import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const capitalizeFirstLetter = (text: unknown): string => {
	if (typeof text !== "string") return "";
	return (text + "").replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

export const formatCurrency = (amount: number | null | undefined): string => {
	if (typeof amount !== "number") return `Rp 0`;
	return amount.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	});
};

export const formatDateToLocal = (dateStr: string, locale: string = "id-ID"): string => {
	const date: Date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "Asia/Jakarta",
	};
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};

export const formatTimeToLocal = (dateStr: string, locale: string = "id-ID"): string => {
	const date: Date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: false,
		timeZone: "Asia/Jakarta",
	};
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};

export type paginationGenerated = Array<number | string>;

export const generatePagination = (currentPage: number, totalPages: number): paginationGenerated => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}
	if (currentPage < 3) {
		return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
	}
	if (currentPage > totalPages - 2) {
		return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
	}
	if (currentPage == 3) {
		return [1, 2, currentPage, currentPage + 1, currentPage + 2, "...", totalPages];
	}
	if (currentPage == totalPages - 2) {
		return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
	}
	return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export const urlSafeBase64Encode = (text: string) => {
	const base64 = btoa(text);
	return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Remove padding
};

export const urlSafeBase64Decode = (encodedText: string) => {
	let base64 = encodedText.replace(/-/g, "+").replace(/_/g, "/");

	// Restore padding if necessary
	while (base64.length % 4) {
		base64 += "=";
	}
	return atob(base64);
};
