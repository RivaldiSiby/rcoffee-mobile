import {API_URL} from '@env';
import axios from 'axios';

export const updatePromo = async (token, data, id) => {
  try {
    const result = axios.patch(`${API_URL}/promos/${id}`, data, {
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
