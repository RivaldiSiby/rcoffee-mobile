import {API_URL} from '@env';
import axios from 'axios';

export const getHistory = async (limit, token) => {
  try {
    const result = await axios.get(`${API_URL}/transaction?limit=${limit}`, {
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
