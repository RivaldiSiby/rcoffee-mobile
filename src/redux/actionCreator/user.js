export const addUser = data => {
  return {
    type: 'ADD_USER',
    payload: data,
  };
};
export const clearUser = () => {
  return {
    type: 'CLEAR_USER',
  };
};
