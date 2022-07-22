import {API_URL} from '@env';
import axios from 'axios';

export const updateProfile = async (token, data) => {
  try {
    console.log(API_URL);
    const result = await axios.patch(`${API_URL}/users`, data, {
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
