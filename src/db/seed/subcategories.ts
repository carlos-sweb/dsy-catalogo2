import { drizzle } from "drizzle-orm/bun-sqlite"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";
import { subcategories } from "./../schema/subcategories.ts"
import { Database } from "bun:sqlite"

const sqlite = new Database(process.env.DATABASE_URL);

const db = drizzle(sqlite);

const result = await db.insert(subcategories).values([
    {name:"bolsas",category:1},
    {name:"guantes",category:1},
    {name:"Vasos",category:1},
    {name:"Cuidado Personal",category:2},
    {name:"General",category:2},
    {name:"General",category:3},
    {name:"General",category:4},
    {name:"Adhesivos",category:4}
])