import {API_URL} from '@env';
import axios from 'axios';

export const getProducts = async category => {
  try {
    let url =
      category === 'favorite'
        ? `${API_URL}/product/favorite?limit=12`
        : `${API_URL}/product?limit=12&category=${category}`;
    url = category === 'all' ? `${API_URL}/product?limit=12` : url;
    const result = await axios.get(url);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
