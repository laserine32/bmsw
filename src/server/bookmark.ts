"use server";
import { db } from "@/db";
import { bookmark, bookmarkTags } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { count, desc, ilike, or } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export type BookmarkType = typeof bookmark.$inferSelect;

export const getBookmarkSearchPagin = async (search: string, page: number = 1) => {
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
		return await db
			.select()
			.from(bookmark)
			.where(where)
			.orderBy(desc(bookmark.date))
			.limit(ITEMS_PER_PAGE)
			.offset(offset);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export type BookmarkSearchPagin = Awaited<ReturnType<typeof getBookmarkSearchPagin>>;

export const getBookmarkTotalPage = async (search: string): Promise<number> => {
	const where = search
		? or(
				ilike(bookmark.title, `%${search}%`),
				ilike(bookmark.siteName, `%${search}%`),
				ilike(bookmark.description, `%${search}%`),
				ilike(bookmark.url, `%${search}%`),
			)
		: undefined;
	const result = await db.select({ total: count() }).from(bookmark).where(where);
	const total = Number(result[0]?.total ?? 0);
	return Math.ceil(total / ITEMS_PER_PAGE);
};

type BookmarkAddType = {
	url: string;
	siteName?: string | undefined;
	title: string;
	description: string;
	type: string;
	imageUrl: string;
	image?: string;
	tags: Array<string>;
};

export const addBookmark = async (values: BookmarkAddType) => {
	try {
		const insertedId = createId();
		const insertData = {
			id: insertedId,
			url: values.url ?? "",
			siteName: values.siteName ?? "",
			title: values.title ?? "",
			description: values.description ?? "",
			type: values.type ?? "",
			imageUrl: values.imageUrl ?? "",
			image: values.image ?? "",
		};
		await db.insert(bookmark).values(insertData);
		const insertTags = values.tags.map((t) => ({ bookmarkId: insertedId, tagsId: t }));
		await db.insert(bookmarkTags).values(insertTags);
	} catch (error) {
		console.error(error);
		// return { error: "Failed to create bookmark" };
		throw error;
	}
};
