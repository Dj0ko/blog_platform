const logInReducer = (state = false, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;

    default:
      return state;
  }
};

export default logInReducer;
