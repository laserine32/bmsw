-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Tags" (
	"id" text PRIMARY KEY NOT NULL,
	"tag" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Bookmark" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"site_name" text,
	"title" text,
	"description" text,
	"type" text,
	"image_url" text,
	"image" text,
	"date" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BookmarkTags" (
	"bookmarkId" text NOT NULL,
	"tagsId" text NOT NULL,
	CONSTRAINT "BookmarkTags_pkey" PRIMARY KEY("bookmarkId","tagsId")
);
--> statement-breakpoint
ALTER TABLE "BookmarkTags" ADD CONSTRAINT "BookmarkTags_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "public"."Bookmark"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "BookmarkTags" ADD CONSTRAINT "BookmarkTags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "public"."Tags"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Tags_tag_key" ON "Tags" USING btree ("tag" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Bookmark_url_key" ON "Bookmark" USING btree ("url" text_ops);
*/