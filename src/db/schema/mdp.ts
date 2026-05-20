import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const mdp = sqliteTable("mdp", {
    id: integer("id").primaryKey(),
    bank: text("bank").notNull(),
    type: text("type").notNull(),
    number: text("number").notNull(),
    holder : text("holder").notNull(),
    rut : text("rut").notNull(),    
});