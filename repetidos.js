import { readFile, writeFile } from 'fs';
const path = 'comics.csv';

// Leer el contenido del archivo CSV
readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Dividir el contenido en líneas
    const lines = data.split('\n');

    // Utilizar un Set para almacenar líneas únicas
    const uniqueLines = new Set(lines);

    // Reconstruir el contenido del archivo con las líneas únicas
    const uniqueContent = Array.from(uniqueLines).join('\n');

    // Sobrescribir el archivo original con el contenido filtrado
    writeFile(path, uniqueContent, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Los valores repetidos han sido eliminados.');
    });
});