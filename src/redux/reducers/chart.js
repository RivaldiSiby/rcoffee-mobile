const initialState = {
  chart: [],
};

const chart = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case 'ADD_CHART':
      return {chart: action.payload};
    case 'CLEAR_CHART':
      return {chart: []};
    default:
      return prevState;
  }
};

export default chart;
