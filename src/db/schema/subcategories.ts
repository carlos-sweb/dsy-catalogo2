import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const subcategories = sqliteTable("subcategories", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    category: integer("category")
            .references(() => categories.id),    
})