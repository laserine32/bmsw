import { relations } from "drizzle-orm/relations";
import { bookmark, bookmarkTags, tags } from "./schema";

export const bookmarkTagsRelations = relations(bookmarkTags, ({one}) => ({
	bookmark: one(bookmark, {
		fields: [bookmarkTags.bookmarkId],
		references: [bookmark.id]
	}),
	tag: one(tags, {
		fields: [bookmarkTags.tagsId],
		references: [tags.id]
	}),
}));

export const bookmarkRelations = relations(bookmark, ({many}) => ({
	bookmarkTags: many(bookmarkTags),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	bookmarkTags: many(bookmarkTags),
}));