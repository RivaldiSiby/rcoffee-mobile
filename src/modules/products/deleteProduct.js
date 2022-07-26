import {API_URL} from '@env';
import axios from 'axios';

export const deleteProduct = async (token, product_id) => {
  try {
    const result = await axios.delete(`${API_URL}/product/${product_id}`, {
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
