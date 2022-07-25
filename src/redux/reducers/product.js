const initialState = {
  product: [],
};

const product = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {product: action.payload};
    case 'CLEAR_PRODUCT':
      return {product: []};
    default:
      return prevState;
  }
};

export default product;
