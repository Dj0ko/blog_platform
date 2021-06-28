const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: `${action.payload}` };

    case 'SET_EMAIL':
      return { ...state, email: `${action.payload}` };

    case 'SET_PASSWORD':
      return { ...state, password: `${action.payload}` };

    case 'CLEAR_DATA':
      return {};

    default:
      return state;
  }
};

export default userDataReducer;
