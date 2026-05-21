import { drizzle } from "drizzle-orm/bun-sqlite"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";
import { categories } from "./../schema/categories.ts"
import { Database } from "bun:sqlite"

const sqlite = new Database(process.env.DATABASE_URL);

const db = drizzle(sqlite);

const result = await db.insert(categories).values([
    { 
        name:"Plásticos", 
        color_primary: "blue.600",
        color_secondary:"blue.400",
        color_text_bg:"blue.100",  
        color_text_primary :"blue.600"      
    },
    { 
        name:"Perfumería", 
        color_primary: "pink.600",
        color_secondary:"pink.400",
        color_text_bg:"pink.100",  
        color_text_primary :"pink.600"      
    },
    {
        name:"Tabaquería", 
        color_primary: "yellow.600",
        color_secondary:"yellow.400",
        color_text_bg:"yellow.100",  
        color_text_primary :"yellow.600"      
    },
    {
        name:"Bazar", 
        color_primary: "gren.600",
        color_secondary:"gren.400",
        color_text_bg:"gren.100",  
        color_text_primary :"gren.600"      
    }
])