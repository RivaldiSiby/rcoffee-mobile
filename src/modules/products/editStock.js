import {API_URL} from '@env';
import axios from 'axios';

export const editStock = async (token, data, id) => {
  try {
    console.log(API_URL);
    const result = await axios.patch(`${API_URL}/stock/${id}`, data, {
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
