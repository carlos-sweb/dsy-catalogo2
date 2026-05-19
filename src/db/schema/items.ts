import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const items = sqliteTable("items", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    price: integer("price"),
    quantity: integer("quantity"),
    image: text("image"),
    features: text("features"),
    category_id: integer("category_id")
        .references(() => categories.id),
});