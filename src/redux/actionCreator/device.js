export const addDevice = data => {
  return {
    type: 'ADD_DEVICE',
    payload: data,
  };
};
export const clearDevice = () => {
  return {
    type: 'CLEAR_DEVICE',
  };
};
