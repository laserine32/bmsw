"use server";
import { db } from "@/db";
import { bookmark, bookmarkTags, tags } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { and, count, desc, eq, getTableColumns, ilike, or } from "drizzle-orm";

export type TagType = typeof tags.$inferSelect;

export const getTags = async () => {
	try {
		return await db.select().from(tags).orderBy(tags.tag);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTag = async (id: string) => {
	try {
		const [data] = await db.select().from(tags).where(eq(tags.id, id)).orderBy(tags.tag);
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTagBookmarkSearchPagin = async (tagId: string, search: string, page: number = 1) => {
	try {
		const offset = (page - 1) * ITEMS_PER_PAGE;
		const where = search
			? or(
					ilike(bookmark.title, `%${search}%`),
					ilike(bookmark.siteName, `%${search}%`),
					ilike(bookmark.description, `%${search}%`),
					ilike(bookmark.url, `%${search}%`),
				)
			: undefined;
		const data = await db
			.select({
				...getTableColumns(bookmark),
			})
			.from(bookmark)
			.leftJoin(bookmarkTags, eq(bookmarkTags.bookmarkId, bookmark.id))
			.where(and(eq(bookmarkTags.tagsId, tagId), where))
			.orderBy(desc(bookmark.date))
			.limit(ITEMS_PER_PAGE)
			.offset(offset);
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTagBookmarkTotalPage = async (tagId: string, search: string): Promise<number> => {
	const where = search
		? or(
				ilike(bookmark.title, `%${search}%`),
				ilike(bookmark.siteName, `%${search}%`),
				ilike(bookmark.description, `%${search}%`),
				ilike(bookmark.url, `%${search}%`),
			)
		: undefined;
	const result = await db
		.select({ total: count() })
		.from(bookmark)
		.leftJoin(bookmarkTags, eq(bookmarkTags.bookmarkId, bookmark.id))
		.where(and(eq(bookmarkTags.tagsId, tagId), where))
		.groupBy(bookmark.id);
	const total = Number(result[0]?.total ?? 0);
	return Math.ceil(total / ITEMS_PER_PAGE);
};
