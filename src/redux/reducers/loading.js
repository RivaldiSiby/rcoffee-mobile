const initialState = {
  status: false,
};

const loading = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case 'IS_LOADING':
      return {status: true};
    case 'DONE_LOADING':
      return {status: false};
    default:
      return prevState;
  }
};

export default loading;
