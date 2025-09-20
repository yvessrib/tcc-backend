CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"price" text NOT NULL,
	"category" text NOT NULL,
	CONSTRAINT "products_id_unique" UNIQUE("id")
);
