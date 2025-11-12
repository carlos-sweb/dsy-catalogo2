export default function (data, name) {
    // 1. Normaliza el término de búsqueda a minúsculas para que no sea sensible
    const searchTerm = name.toLowerCase();

    // 2. Recorre las categorías principales usando map
    return data.map(category => {
        
        // 3. Recorre las subcategorías usando map
        const filteredSubcategories = category.subcategorias.map(subcategory => {
            
            // 4. Filtra los productos que coinciden con el término de búsqueda
            const matchingProducts = subcategory.productos.filter(product =>
                product.nombre.toLowerCase().includes(searchTerm)
            );

            // 5. Si hay productos que coinciden, retorna una *nueva* subcategoría
            //    copiando sus propiedades y asignando solo los productos filtrados.
            if (matchingProducts.length > 0) {
                return { 
                    ...subcategory, 
                    productos: matchingProducts 
                };
            }
            // 6. Si no hay productos, retorna null para esta subcategoría
            return null;
        }).filter(sub => sub !== null); // 7. Limpia las subcategorías que quedaron en null

        // 8. Si esta categoría tiene subcategorías con productos...
        if (filteredSubcategories.length > 0) {
            // 9. Retorna una *nueva* categoría con las subcategorías filtradas
            return { 
                ...category, 
                subcategorias: filteredSubcategories 
            };
        }
        // 10. Si no, retorna null para esta categoría
        return null;
    }).filter(cat => cat !== null); // 11. Limpia las categorías que quedaron en null
}