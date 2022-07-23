import {API_URL} from '@env';
import axios from 'axios';

export const resetPassword = async payload => {
  try {
    const result = await axios.patch(`${API_URL}/auth/resetPassword`, payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
