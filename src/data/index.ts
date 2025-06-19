// Este script se encarga de limpiar la base de datos al ejecutar el comando `npm run db`

import {exit} from 'node:process';
import db from '../config/db';


const clearDB = async () => {
    try {
        await db.sync({ force: true }); // Elimina todas las tablas y sus datos
        console.log('Base de datos limpiada correctamente');
        exit(0);// Salir con código 0 indica éxito
    } catch (error) {
        console.error('Error al limpiar la base de datos:', error);
        exit(1);
        
    }
}

if(process.argv[2] === '--clear') {
    clearDB();
}





