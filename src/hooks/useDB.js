import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

export const useDB = () => {
    const openDatabase = async () => {
        if (Platform.OS === "web") return null;
        return await SQLite.openDatabaseAsync("sessions.db");
    };

    const initDB = async () => {
        const db = await openDatabase();
        if (!db) return;

        const sql = `CREATE TABLE IF NOT EXISTS sessions (
            localId TEXT PRIMARY KEY NOT NULL, 
            email TEXT NOT NULL, 
            token TEXT NOT NULL,
            name TEXT,
            image TEXT
        );`;

        try {
            await db.execAsync(sql);
        } catch (error) {
        }
    };

    const insertSession = async ({ email, localId, token, name, image }) => {
        const db = await openDatabase();
        if (!db) return;

        const sql = `INSERT OR REPLACE INTO sessions (localId, email, token, name, image) VALUES (?, ?, ?, ?, ?);`;
        const args = [localId, email, token, name, image];

        try {
            const res = await db.runAsync(sql, args);
            return res;
        } catch (error) {
        }
    };

    const getSessionByLocalId = async (localId) => {
        const db = await openDatabase();
        if (!db) return;
        const sql = "SELECT * FROM sessions WHERE localId = ?;";
        try {
            const session = await db.getAsync(sql, [localId]);
            return session;
        } catch (error) {
            return null;
        }
    };

    const truncateSessionTable = async () => {
        const db = await openDatabase();
        if (!db) return;
        const sql = `DELETE FROM sessions`;

        try {
            const res = await db.execAsync(sql);
            return res;
        } catch (error) {
        }
    };

    const getAllSessions = async () => {
        const db = await openDatabase();
        if (!db) return;
        try {
            const sql = "SELECT * FROM sessions;";
            const result = await db.getAllAsync(sql);
            return result;
        } catch (error) {
            return [];
        }
    };

    return {
        initDB,
        insertSession,
        getSessionByLocalId,
        truncateSessionTable,
        getAllSessions
    };
};
