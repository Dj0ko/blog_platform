const errorReducer = (state = false, action) => {
  switch (action.type) {
    case 'HAS_ERROR':
      return true;

    default:
      return state;
  }
};

export default errorReducer;
