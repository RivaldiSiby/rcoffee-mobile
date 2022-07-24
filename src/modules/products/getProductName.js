import {API_URL} from '@env';
import axios from 'axios';

export const getProductsName = async token => {
  try {
    const result = await axios.get(API_URL + '/product/product', {
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
