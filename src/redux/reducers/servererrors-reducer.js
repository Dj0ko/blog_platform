const serverErrorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SERVER_ERROR':
      return { ...action.payload };

    default:
      return state;
  }
};

export default serverErrorsReducer;
