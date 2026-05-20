import { drizzle } from "drizzle-orm/bun-sqlite"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";
import { mdp } from "./../schema/mdp.ts"
import { Database } from "bun:sqlite"

const sqlite = new Database(process.env.DATABASE_URL);

const db = drizzle(sqlite);

const result = await db.insert(mdp).values([
    { bank:"Banco Scotiabank", type: "CORRIENTE",number:"990308082",holder:"BAZAR Y PAQUETERIA DAISY MONTENEGRO E.I.R.L",rut:"77.998.347-1"},
    { bank:"Banco Estado",type: "RUT",number:"16088145",holder:"DAISY NATALY MONTENEGRO VERA",rut:"16.088.145-3"}
])