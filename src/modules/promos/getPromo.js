import {API_URL} from '@env';
import axios from 'axios';

export const getPromo = async () => {
  try {
    const result = await axios.get(API_URL + '/promos');
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
