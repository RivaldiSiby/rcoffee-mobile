import {API_URL} from '@env';
import axios from 'axios';

export const postPayment = async (token, data) => {
  try {
    await axios.post(`${API_URL}/transaction`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
