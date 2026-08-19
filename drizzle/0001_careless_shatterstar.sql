CREATE TABLE "msvph" (
	"serial" serial PRIMARY KEY NOT NULL,
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
DROP TABLE "_prisma_migrations" CASCADE;