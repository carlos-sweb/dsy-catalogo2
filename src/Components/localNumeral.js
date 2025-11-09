export default {
    delimiters: {
        // En Chile se usa el punto (.) para los miles
        thousands: '.',
        // En Chile se usa la coma (,) para los decimales
        decimal: ','
    },
    abbreviations: {
        // Abreviaciones comunes en español, aunque a veces no se usan tanto como en inglés
        thousand: 'mil',
        million: 'millón',
        billion: 'mil millones', // o 'millardo' aunque es menos común
        trillion: 'billón'
    },
    ordinal : function (number) {
        // Función para el ordinal, en español se usa 'º' o 'ª'
        var remainder = number % 100;
        return (remainder >= 11 && remainder <= 13) ? 'º' : ['º', 'ª', 'º', 'ª', 'º', 'ª', 'º', 'ª', 'º', 'ª'][number % 10];
        /*
        Alternativa más simple pero menos precisa (solo usa 'º'):
        return 'º';
        */
    },
    currency: {
        // Símbolo del Peso Chileno
        symbol: '$'
    }
}