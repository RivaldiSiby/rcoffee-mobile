import {API_URL} from '@env';
import axios from 'axios';

export const LogoutHandler = async refreshToken => {
  try {
    console.log(`${API_URL}/auth/${refreshToken}`);
    const result = await axios.delete(`${API_URL}/auth/${refreshToken}`);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
