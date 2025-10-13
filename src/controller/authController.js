import { db } from '../database/database';
import * as Crypto from 'expo-crypto';

// Hasha a senha antes de armazená-la para segurança
const hashPassword = async (password) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return digest;
};

// Cadastra um novo usuário no banco de dados
export const createUser = (nome, email, senha) => {
  return new Promise(async (resolve, reject) => {
    try {
      const senhaHash = await hashPassword(senha);
      
      await db.runAsync(
        `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);`,
        [nome, email, senhaHash]
      );
      // retorna um objeto com lastInsertRowId
      const result = await db.runAsync(`SELECT last_insert_rowid() as id`);
      resolve(result.lastInsertRowId);
      
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        reject(new Error('Email já cadastrado.'));
      } else {
        reject(error);
      }
    }
  });
};

// Autentica um usuário
export const loginUser = (email, senha) => {
  return new Promise(async (resolve, reject) => {
    try {
      const senhaHash = await hashPassword(senha);
      
      const result = await db.getAllAsync(
        `SELECT * FROM usuarios WHERE email = ? AND senha = ?;`,
        [email, senhaHash]
      );
      
      if (result.length > 0) {
        resolve(result[0]); // Retorna o primeiro usuário encontrado
      } else {
        reject(new Error('E-mail ou senha inválidos.'));
      }
      
    } catch (error) {
      reject(error);
    }
  });
};