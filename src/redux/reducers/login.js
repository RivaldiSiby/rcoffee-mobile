const initialState = {
  status: false,
  auth: [],
};

const login = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case 'SUCCESS_LOGIN':
      return {status: true, auth: action.payload};
    case 'FAIL_LOGIN':
      return {status: false, auth: []};
    default:
      return prevState;
  }
};

export default login;
