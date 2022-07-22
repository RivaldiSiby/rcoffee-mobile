import {API_URL} from '@env';
import axios from 'axios';

export const getUser = async token => {
  try {
    const result = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
