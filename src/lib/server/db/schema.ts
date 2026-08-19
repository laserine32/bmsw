import { pgTable, timestamp, text, uniqueIndex, foreignKey, primaryKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const tags = pgTable(
	'Tags',
	{
		id: text().primaryKey().notNull(),
		tag: text().notNull()
	},
	(table) => [
		uniqueIndex('Tags_tag_key').using('btree', table.tag.asc().nullsLast().op('text_ops'))
	]
);

export const bookmark = pgTable(
	'Bookmark',
	{
		id: text().primaryKey().notNull(),
		url: text().notNull(),
		siteName: text('site_name'),
		title: text(),
		description: text(),
		type: text(),
		imageUrl: text('image_url'),
		image: text(),
		date: timestamp({ precision: 3, mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull()
	},
	(table) => [
		uniqueIndex('Bookmark_url_key').using('btree', table.url.asc().nullsLast().op('text_ops'))
	]
);

export const bookmarkTags = pgTable(
	'BookmarkTags',
	{
		bookmarkId: text().notNull(),
		tagsId: text().notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.bookmarkId],
			foreignColumns: [bookmark.id],
			name: 'BookmarkTags_bookmarkId_fkey'
		})
			.onUpdate('cascade')
			.onDelete('restrict'),
		foreignKey({
			columns: [table.tagsId],
			foreignColumns: [tags.id],
			name: 'BookmarkTags_tagsId_fkey'
		})
			.onUpdate('cascade')
			.onDelete('restrict'),
		primaryKey({ columns: [table.bookmarkId, table.tagsId], name: 'BookmarkTags_pkey' })
	]
);

export const msvph = pgTable('msvph', {
	id: text().primaryKey().notNull(),
	url: text().notNull(),
	siteName: text('site_name'),
	title: text(),
	description: text(),
	type: text(),
	imageUrl: text('image_url'),
	image: text(),
	date: timestamp({ precision: 3, mode: 'string' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});
