import axios from 'axios';

export async function GenerateToken(auth) {
  try {
    const result = await axios.get(
      `${process.env.API_URL}/auth/${auth['refreshkey']}`,
    );
    if (result.data.data.token !== undefined) {
      return result.data.data.token;
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
