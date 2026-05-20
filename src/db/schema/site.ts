import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const site = sqliteTable("site", {
    id : integer("id").primaryKey(),
    page : text("page").notNull(),
    section : text("section").notNull(),
    property : text("property").notNull(),
    value : text("value").notNull(),    
});