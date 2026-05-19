import { drizzle } from "drizzle-orm/bun-sqlite";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import {items} from "./src/db/schema/items.ts";

import { Database } from "bun:sqlite";


const sqlite = new Database("src/data.sqlite3");

const db = drizzle(sqlite);


const result = await db.select().from(items);


console.log(result);
