import {API_URL} from '@env';
import axios from 'axios';

export const doneTransaction = async (data, token) => {
  try {
    const result = await axios.patch(
      `${API_URL}/transaction/confirmDone`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
