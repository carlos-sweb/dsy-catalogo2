import { drizzle } from "drizzle-orm/bun-sqlite"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";
import { items } from "./src/db/schema/items.ts"
import { mdp } from "./src/db/schema/mdp.ts"
import { site } from "./src/db/schema/site.ts"
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


var main = {};

const result = await db.select().from(site);

for( const index in result){
    const row = result[index];
    if( !main.hasOwnProperty(row.page)  ){ main[row.page] = {} }
    if( !main[row.page].hasOwnProperty(row.section)  ){ main[row.page][row.section] = {} }
    if( !main.hasOwnProperty(main[row.page][row.section][row.property])  ){ main[row.page][row.section][row.property] = row.value }
}


console.log(main)
//console.log(result)



