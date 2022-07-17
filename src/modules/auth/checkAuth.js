import axios from 'axios';

export default async function GenerateToken(auth) {
  const result = await axios.get(
    `${process.env.API_URL}/auth/${auth['refreshkey']}`,
  );
  if (result.data.data.token !== undefined) {
    return result.data.data.token;
  }
  return;
}
