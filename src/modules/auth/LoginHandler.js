import {API_URL} from '@env';
import axios from 'axios';

export const LoginHandler = async (Email, Pass) => {
  try {
    const result = await axios.post(`${API_URL}/auth`, {
      email: Email,
      password: Pass,
    });
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
