const initialState = {
  user: [],
};

const user = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case "ADD_USER":
      return { user: action.payload };
    case "CLEAR_USER":
      return { user: [] };
    default:
      return prevState;
  }
};

export default user;
