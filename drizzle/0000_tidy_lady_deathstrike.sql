CREATE TABLE `items` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` integer,
	`quantity` integer DEFAULT 1,
	`image` text,
	`features` text,
	`category_id` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`color_primary` text,
	`color_secondary` text,
	`color_text_bg` text,
	`color_text_primary` text,
	`sub_category_name` text
);
--> statement-breakpoint
CREATE TABLE `mdp` (
	`id` integer PRIMARY KEY NOT NULL,
	`bank` text NOT NULL,
	`type` text NOT NULL,
	`number` text NOT NULL,
	`holder` text NOT NULL,
	`rut` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site` (
	`id` integer PRIMARY KEY NOT NULL,
	`page` text NOT NULL,
	`section` text NOT NULL,
	`property` text NOT NULL,
	`value` text NOT NULL
);
