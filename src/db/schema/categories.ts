import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    color_primary: text("color_primary"),
    color_secondary: text("color_secondary"),
    color_text_bg: text("color_text_bg"),
    color_text_primary: text("color_text_primary"),
    sub_category_name: text("sub_category_name"),
});
