import {API_URL} from '@env';
import axios from 'axios';

export const updatePass = async (token, data) => {
  try {
    console.log(API_URL);
    const result = await axios.patch(`${API_URL}/users/changepass`, data, {
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
