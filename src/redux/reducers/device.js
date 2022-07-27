const initialState = {
  device: [],
};

const device = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case 'ADD_DEVICE':
      return {device: action.payload};
    case 'CLEAR_DEVICE':
      return {device: []};
    default:
      return prevState;
  }
};

export default device;
