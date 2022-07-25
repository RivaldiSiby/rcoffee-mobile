import {API_URL} from '@env';
import axios from 'axios';

export const promoDetail = async (token, id) => {
  try {
    const result = axios.get(`${API_URL}/promos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
      },
    });
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
