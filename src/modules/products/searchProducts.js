import {API_URL} from '@env';
import axios from 'axios';

export const searchProducts = async (search, category = null) => {
  try {
    console.log(search);
    const url = `${API_URL}/product?limit=12${
      category === null || category === 'all' ? '' : `&category=${category}`
    }&name=${search}`;
    console.log(url);
    const result = await axios.get(url);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
