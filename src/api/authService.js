import { loginUser, createUser } from '../controller/authController';

export const loginApi = async (email, senha) => {
  try {
    const user = await loginUser(email, senha);
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signUpApi = async (nome, email, senha) => {
  try {
    const userId = await createUser(nome, email, senha);
    return { success: true, userId };
  } catch (error) {
    return { success: false, message: error.message };
  }
};