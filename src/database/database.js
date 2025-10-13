import * as SQLite from 'expo-sqlite';

let db;

const initDb = async () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      db = await SQLite.openDatabaseAsync('invento.db');
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS itens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          descricao TEXT,
          local TEXT,
          quantidade INTEGER NOT NULL DEFAULT 0,
          imagem_path TEXT,
          user_id INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE
        );`
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

export { db, initDb };