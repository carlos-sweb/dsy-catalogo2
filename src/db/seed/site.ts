import { drizzle } from "drizzle-orm/bun-sqlite"
import { site } from "./../schema/site.ts"
import { Database } from "bun:sqlite"

const sqlite = new Database(process.env.DATABASE_URL);
const db = drizzle(sqlite);

const result = await db.insert(site).values([
    { page:"site", section: "header",property:"title",value:"Catálogo"},
    { page:"site", section: "header",property:"subtitle",value:"Productos de calidad para su negocio"},
    { page:"site", section: "footer",property:"copyright",value:"© 2026 Catálogo"},
    { page:"site", section: "footer",property:"aviso",value:"Todos los precios están sujetos a cambios sin previo aviso"},
    { page:"site", section: "footer",property:"link_text",value:"Medios de pago"},
    { page:"site", section: "footer",property:"link_url",value:"#!/medios-de-pago"},
    { page:"mdp", section:  "header",property:"title",value:"Catálogo"},
    { page:"mdp", section: "header",property:"subtitle",value:"Medios de Pago"},
    { page:"mdp", section: "footer",property:"copyright",value:"© 2026 Catálogo"},
    { page:"mdp", section: "footer",property:"aviso",value:"Todos los precios están sujetos a cambios sin previo aviso"},
    { page:"mdp", section: "footer",property:"link_text",value:"Volver al Catálogo"},
    { page:"mdp", section: "footer",property:"link_url",value:"#!/"},
])