export const addProduct = data => {
  return {
    type: 'ADD_PRODUCT',
    payload: data,
  };
};
export const clearProduct = () => {
  return {
    type: 'CLEAR_PRODUCT',
  };
};
