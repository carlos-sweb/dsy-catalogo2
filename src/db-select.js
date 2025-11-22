import { Database } from "bun:sqlite";

const db = new Database("src/data.sqlite3",{ readonly: true });
const result = db.query("select * from items LEFT JOIN categories ON items.category_id=categories.id").all();
//const result = db.query("select * from items").all();

console.log(result)
