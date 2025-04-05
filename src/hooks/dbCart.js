import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

const db = Platform.OS !== 'web' ? SQLite.openDatabaseSync('cart.db') : null;

export const useCartDB = () => {
    const createTable = () => {
        if (!db) return;

        db.execSync(`
            CREATE TABLE IF NOT EXISTS cart (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                localId TEXT NOT NULL,
                titulo TEXT NOT NULL,
                horario TEXT NOT NULL,
                precio REAL NOT NULL,
                cantidad INTEGER NOT NULL,
                formato TEXT,
                idioma TEXT,
                imagenKey TEXT
            );
        `);
    };

    const insertItem = ({ localId, titulo, horario, precio, cantidad, formato, idioma, imagenKey }) => {
        if (!db) return;

        db.runSync(
            `INSERT INTO cart (localId, titulo, horario, precio, cantidad, formato, idioma, imagenKey)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [localId, titulo, horario, precio, cantidad, formato, idioma, imagenKey]
        );
    };

    const getItemsByUser = (localId, callback) => {
        if (!db) return;

        const result = db.getAllSync(
            `SELECT * FROM cart WHERE localId = ?;`,
            [localId]
        );

        callback(result);
    };

    const clearCart = (localId) => {
        if (!db) return;

        db.runSync(`DELETE FROM cart WHERE localId = ?;`, [localId]);
    };

    const deleteItem = (titulo, horario, localId) => {
        if (!db) return;

        db.runSync(
            `DELETE FROM cart WHERE titulo = ? AND horario = ? AND localId = ?;`,
            [titulo, horario, localId]
        );
    };

    return {
        createTable,
        insertItem,
        getItemsByUser,
        clearCart,
        deleteItem
    };
};
