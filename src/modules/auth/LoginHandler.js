import {API_URL} from '@env';
import axios from 'axios';

export const LoginHandler = async user => {
  try {
    const result = await axios.post(`${API_URL}/auth`, user);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
