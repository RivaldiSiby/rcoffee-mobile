import {API_URL} from '@env';
import axios from 'axios';

export const addPromo = async (token, data) => {
  try {
    console.log(API_URL);
    const result = await axios.post(`${API_URL}/promos`, data, {
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
