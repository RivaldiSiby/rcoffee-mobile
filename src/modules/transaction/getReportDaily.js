import {API_URL} from '@env';
import axios from 'axios';

export const getReportDaily = async token => {
  try {
    const result = await axios.get(`${API_URL}/transaction/daily`, {
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
