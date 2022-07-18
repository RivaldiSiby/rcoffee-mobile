import {API_URL} from '@env';
import axios from 'axios';

export const getProductsAll = async url => {
  try {
    const result = await axios.get(API_URL + url);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
