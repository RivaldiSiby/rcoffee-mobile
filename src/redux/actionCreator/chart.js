export const addChart = data => {
  return {
    type: 'ADD_CHART',
    payload: data,
  };
};
export const clearChart = () => {
  return {
    type: 'CLEAR_CHART',
  };
};
