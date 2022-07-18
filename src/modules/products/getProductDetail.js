import {API_URL} from '@env';
import axios from 'axios';

export const getProductDetail = async id => {
  try {
    const result = await axios.get(`${API_URL}/product/${id}`);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
