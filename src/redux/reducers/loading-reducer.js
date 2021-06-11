const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'HAS_SPINNER':
      return !!action.payload;

    default:
      return state;
  }
};

export default loadingReducer;
