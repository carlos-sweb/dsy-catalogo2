
import { Database } from "bun:sqlite";
import * as data from "./data.json";

const db = new Database("src/data.sqlite3");

const categories = data.site.content.categorias;

for (const category of categories) {
    const categoryName = category.name;
    const colors = category.colors;

    for (const subcategory of category.subcategorias) {
        const subcategoryName = subcategory.name;

        const { lastInsertRowid } = db.query(
            'INSERT INTO categories (name, color_primary, color_secondary, color_text_bg, color_text_primary, sub_category_name) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(
            categoryName,
            colors.primary,
            colors.secondary,
            colors['text-bg'],
            colors['text-primary'],
            subcategoryName,
        );
        const categoryId = lastInsertRowid;
        console.log(`A row has been inserted into categories with rowid ${categoryId}`);

        const products = subcategory.productos;
        for (const product of products) {
            db.query(
                'INSERT INTO items (name, description, price, price_unit, image, features, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
            ).run(
                product.nombre,
                product.descripcion,
                product.precio,
                product.precio_unitario,
                product.imagen,
                product.caracteristicas ? JSON.stringify(product.caracteristicas) : null,
                categoryId,
            );
            console.log(`A row has been inserted into items with name ${product.nombre}`);
        }
    }
}

db.close();
