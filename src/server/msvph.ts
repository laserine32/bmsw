"use server";
import { db } from "@/db";
import { msvph } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { count, desc, eq, ilike, or } from "drizzle-orm";

export type MsvphType = typeof msvph.$inferSelect;

export const getMsvphSearchPagin = async (search: string, page: number = 1) => {
	try {
		const offset = (page - 1) * ITEMS_PER_PAGE;
		const where = search
			? or(
					ilike(msvph.title, `%${search}%`),
					ilike(msvph.siteName, `%${search}%`),
					ilike(msvph.description, `%${search}%`),
					ilike(msvph.url, `%${search}%`),
				)
			: undefined;
		return await db
			.select({
				id: msvph.id,
				url: msvph.url,
				siteName: msvph.siteName,
				title: msvph.title,
				description: msvph.description,
				type: msvph.type,
				imageUrl: msvph.imageUrl,
				date: msvph.date,
			})
			.from(msvph)
			.where(where)
			.orderBy(desc(msvph.date))
			.limit(ITEMS_PER_PAGE)
			.offset(offset);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export type MsvphSearchPagin = Awaited<ReturnType<typeof getMsvphSearchPagin>>;

export const getMsvphTotalPage = async (search: string): Promise<number> => {
	const where = search
		? or(
				ilike(msvph.title, `%${search}%`),
				ilike(msvph.siteName, `%${search}%`),
				ilike(msvph.description, `%${search}%`),
				ilike(msvph.url, `%${search}%`),
			)
		: undefined;
	const result = await db.select({ total: count() }).from(msvph).where(where);
	const total = Number(result[0]?.total ?? 0);
	return Math.ceil(total / ITEMS_PER_PAGE);
};

export const getSiteName = async () => {
	try {
		const data = await db.select({ data: msvph.siteName }).from(msvph).groupBy(msvph.siteName);
		return data.map((e) => e.data);
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getMSPHImage = async (id: string) => {
	try {
		const [{ gambar }] = await db.select({ gambar: msvph.image }).from(msvph).where(eq(msvph.id, id)).limit(1);
		return gambar;
	} catch (error) {
		console.error(error);
		return null;
	}
};
