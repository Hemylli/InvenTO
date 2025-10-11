//conexão com o banco de dados
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('invento.db');

const initDb = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Cria tabela USUARIOS
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL
        );`,
        [], 
        () => {
          // Sucesso na criação da tabela usuarios e cria tabela ITENS
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS itens (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome TEXT NOT NULL,
              descricao TEXT,
              local TEXT,
              quantidade INTEGER NOT NULL DEFAULT 0,
              imagem_path TEXT,
              user_id INTEGER NOT NULL,
              FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE
            );`,
            [], 
            () => resolve(), // Sucesso na criação da tabela itens
            (_, err) => reject(err) // Erro na criação da tabela itens
          );
        },
        (_, err) => reject(err) // Erro na criação da tabela usuarios
      );
    });
  });
  return promise;
};

export { db, initDb };
