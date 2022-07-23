import {API_URL} from '@env';
import axios from 'axios';

export const getTransaction = async (id, token) => {
  try {
    const result = await axios.get(`${API_URL}/transaction/${id}`, {
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
