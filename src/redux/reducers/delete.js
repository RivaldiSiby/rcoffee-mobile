const initialState = {
  status: false,
};

const ondelete = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case 'ON_DELETE':
      return {status: action.delete};
    default:
      return prevState;
  }
};

export default ondelete;
