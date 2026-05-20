import { drizzle } from "drizzle-orm/bun-sqlite"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";
import { items } from "./src/db/schema/items.ts"
import { mdp } from "./src/db/schema/mdp.ts"
import { Database } from "bun:sqlite"

const sqlite = new Database(process.env.DATABASE_URL);

const db = drizzle(sqlite);
/*
const result = await db.select({
    id : items.id,
    name : items.name,
    description : items.description,
    price : items.price,
    price_unit : sql<number>`${items.price} * ${items.quantity}`,
    quantity : items.quantity ,
    image : items.image,
    features : items.features,
    category_id : items.category_id
})
.from(items)
.where(sql`${items.category_id} = 5`)
*/

const result = await db.select().from(mdp);

console.log(result);
console.log(result.length);
