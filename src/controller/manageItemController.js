import { db } from '../database/database';

/**
 * Cria um novo item no banco de dados.
 * @param {object} item - O objeto do item a ser criado.
 * @param {number} userId - O ID do usuário logado.
 * @returns {Promise<boolean>} True se for bem-sucedido, false caso contrário.
 */
export const criarItem = async (item, userId) => {
  const { nome, local, quantidade, descricao, imagem_path } = item;
  try {
    const result = await db.runAsync(
      'INSERT INTO itens (nome, local, quantidade, descricao, imagem_path, user_id) VALUES (?, ?, ?, ?, ?, ?);',
      [nome, local, quantidade, descricao, imagem_path, userId]
    );
    // se o result.lastInsertRowId > 0, significa que inseriu
    return result.lastInsertRowId > 0;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    // Propaga o erro para ser tratado na tela
    throw error;
  }
};

/**
 * Busca todos os itens de um usuário específico.
 * @returns {Promise<Array<object>>} Uma lista de todos os itens do usuário.
 */
export const buscarTodosItens = async () => {
  try {
    const itens = await db.getAllAsync('SELECT * FROM itens ORDER BY nome;');
    return itens || [];
  } catch (error) {
    console.error('Erro ao buscar todos os itens:', error);
    throw error;
  }
};

/**
 * Busca um item no banco de dados pelo nome ou pelo local.
 * A busca é "case-insensitive" e procura por correspondências parciais.
 * @param {string} query - O termo de busca (nome ou local).
 * @returns {Promise<object|null>} O objeto do item encontrado ou null se não encontrar.
 */
export const buscarItem = async (query) => {
  if (!query) {
    return null;
  }
  try {
    // Usamos getFirstAsync para pegar o primeiro resultado que corresponde à busca
    const item = await db.getFirstAsync(
      'SELECT * FROM itens WHERE nome LIKE ? OR local LIKE ? LIMIT 1;',
      [`%${query}%`, `%${query}%`]
    );
    // Retorna o item encontrado ou null se a busca não retornar nada
    return item || null;
  } catch (error) {
    console.error('Erro ao buscar item:', error);
    // Propaga o erro para ser tratado na tela
    throw error;
  }
};

/**
 * Salva (atualiza) um item no banco de dados.
 * @param {object} item - O objeto do item a ser salvo, deve conter o id.
 * @returns {Promise<boolean>} True se for bem-sucedido, false caso contrário.
 */
export const salvarItem = async (item) => {
  const { id, nome, local, quantidade, descricao, imagem_path } = item;
  try {
    const result = await db.runAsync(
      'UPDATE itens SET nome = ?, local = ?, quantidade = ?, descricao = ?, imagem_path = ? WHERE id = ?;',
      [nome, local, quantidade, descricao, imagem_path, id]
    );
    return result.changes > 0;
  } catch (error) {
    console.error('Erro ao salvar item:', error);
    throw error;
  }
};

/**
 * Exclui um item do banco de dados.
 * @param {number} id - O ID do item a ser excluído.
 * @returns {Promise<boolean>} True se for bem-sucedido, false caso contrário.
 */
export const excluirItem = async (id) => {
  try {
    const result = await db.runAsync('DELETE FROM itens WHERE id = ?;', [id]);
    return result.changes > 0;
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    throw error;
  }
};
