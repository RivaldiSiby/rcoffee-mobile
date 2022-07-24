import {API_URL} from '@env';
import axios from 'axios';

export const addStock = async (token, data) => {
  try {
    console.log(API_URL);
    const result = await axios.post(`${API_URL}/stock`, data, {
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
