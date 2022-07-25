import {API_URL} from '@env';
import axios from 'axios';

export const editProduct = async (token, data, id) => {
  try {
    console.log(API_URL);
    const result = await axios.patch(`${API_URL}/product/${id}`, data, {
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
