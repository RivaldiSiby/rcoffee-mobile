import {API_URL} from '@env';
import axios from 'axios';

export const activationHandler = async payload => {
  try {
    const result = await axios.post(`${API_URL}/auth/confirmEmail`, payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
