import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { subcategories } from "./subcategories";

export const items = sqliteTable("items", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    price: integer("price"),
    quantity: integer("quantity").default(1),
    image: text("image"),
    features: text("features"),
    category: integer("category")
        .references(() => subcategories.id),
});